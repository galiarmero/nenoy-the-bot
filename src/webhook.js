const fastifyPlugin = require('fastify-plugin')

module.exports = fastifyPlugin(async (app) => {
    const domain = process.env.VERCEL_URL ?? app.url
    app.log.info(`Creating webhook on ${domain}`)

    const webhook = await app.bot.createWebhook({ domain })
    const webhookPath = `/telegraf/${app.bot.secretPathComponent()}`

    // Small hack here to pass the `req` if the raw request's body is empty
    // For some reason, when app is started locally using `fastify.listen`
    // the `req.raw.body` is empty but the `req.body` is not.
    // Meanwhile, when app runs as serverless function in Vercel, we use
    // `fastify.server.emit`. In this scenario, the `req.raw.body` is not empty
    app.post(webhookPath, (req, rep) => webhook(req.raw.body ? req.raw : req, rep.raw))


    // Push notifs for website deploys
    const NOTIFY_STATES = [ 'error', 'building', 'ready' ] // other possible states: `building`, `ready`
    const NOTIF_CHAT_IDS = (process.env.NOTIF_CHAT_IDS ?? "")
                                .split(',').map((i) => parseInt(i.trim()))

    const formatMessage = {
        'building': (link) => `🚀 Deploy for galiarmero\\.dev ongoing\\.`,
        'error': (link) => `🚩 Deploy for galiarmero\\.dev failed\\.\n\n\t• 🔎 View [logs](${link})\n\t• ▶️ /deploysite`,
        'ready': (link) => `✅ Deploy for galiarmero\\.dev succeeded\\.`,
    }
    app.post(`/events/website-deploys`, async (req, res) => {
        console.log(req.body)
        const { id, state, context, admin_url } = req.body

        if (context !== 'production') return res.send()
        if (!NOTIFY_STATES.includes(state)) return res.send()

        const deployLink = `${admin_url}/deploys/${id}`
        await Promise.all(NOTIF_CHAT_IDS.map(async (chatId) => {
            await app.bot.telegram.sendMessage(
                chatId,
                formatMessage[state](deployLink),
                {
                    parse_mode: 'MarkdownV2',
                    disable_web_page_preview: true,
                }
            )
        }))
        return res.send()
    })
})
