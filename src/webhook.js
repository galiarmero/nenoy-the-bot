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
})