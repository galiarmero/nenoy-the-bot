const NOTIFY_STATES = [ 'error', 'building', 'ready' ] // other possible states: `building`, `ready`
const formatMessage = {
    'building': () => `🚀 Deploy for galiarmero\\.dev ongoing\\.`,
    'error': (link) => `🚩 Deploy for galiarmero\\.dev failed\\.\n\n  • 🔎 View [logs](${link})\n  • ▶️ /deploysite`,
    'ready': () => `✅ Deploy for galiarmero\\.dev succeeded\\.`,
}

const websiteDeployEventHandler = async (app, request, reply) => {
    console.log(request.body)
    const { id, state, context, admin_url } = request.body

    if (context !== 'production') return reply.send()
    if (!NOTIFY_STATES.includes(state)) return reply.send()

    const deployLink = `${admin_url}/deploys/${id}`
    await Promise.all(app.config.NOTIF_CHAT_IDS.map(async (chatId) => {
        await app.bot.telegram.sendMessage(
            chatId,
            formatMessage[state](deployLink),
            {
                parse_mode: 'MarkdownV2',
                disable_web_page_preview: true,
            }
        )
    }))
    return reply.send()
}

module.exports = websiteDeployEventHandler
