const { Telegraf } = require('telegraf')
const fastifyPlugin = require('fastify-plugin')

const gatekeeper = require('./middlewares/gatekeeper')
const mainController = require('./controllers')

module.exports = fastifyPlugin(async (app) => {
    const bot = new Telegraf(process.env.BOT_TOKEN)

    bot.use(gatekeeper)
    bot.start((ctx) => {
        ctx.reply(
            `Hi, ${ctx.update.message.from.first_name}! I'm Nenoy 🐶, ` +
            `your personal assistant. I'll be taught many tricks for you in the future.\n\n` +
            `For now, I'll take care of your puzzle scores. ` +
            `Just send them to me and I'll ship it to your website! 🚀`
        )
    })
    bot.help((ctx) => ctx.reply('Send me your puzzle results and I\'ll ship them to your website! 🚀' + `\n[Chat ID: ${ctx.chat.id}]`))
    bot.on('message', mainController)

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))

    app?.log.info(`Bot created`)
    app?.decorate('bot', bot)

    return bot
})
