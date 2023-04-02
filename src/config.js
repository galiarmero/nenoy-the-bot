const fastifyPlugin = require('fastify-plugin')

module.exports = fastifyPlugin(async (app) => {
    const NOTIF_CHAT_IDS =
        (process.env.NOTIF_CHAT_IDS ?? "")
            .split(',').map((i) => parseInt(i.trim()))
    app.decorate('config', { NOTIF_CHAT_IDS })
})
