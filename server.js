const Fastify = require('fastify')
const fastifyPlugin = require('fastify-plugin')
const ngrok = require('ngrok')
require('dotenv').config()

if (process.env.UPDATE_METHOD == 'polling') {
    require('./src/bot')().then(bot => bot.launch())
} else {
    // Set up webhook server
    const app = Fastify({
        logger: true,
    })
    const PORT = process.env.PORT ?? 5000
    
    app.register(fastifyPlugin(async (a) => {
        let url = process.env.WEBHOOK_BASE_URL
        if (process.env.NODE_ENV == 'development') {
            url = await ngrok.connect(PORT)
        }
        a.decorate('url', url)
    })).after(() => {
        app.register(require('./src/bot')).after(() => {
            app.register(require('./src/webhook'))
        })
    })
    
    app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
        if (err) {
            app.log.error(err)
            process.exit(1)
        }
    })
}


