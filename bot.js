const { Telegraf } = require('telegraf')
const gatekeeper = require('./middlewares/gatekeeper')
const mainController = require('./controllers')

require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(gatekeeper)

bot.start((ctx) => {
    ctx.reply(
        `Hi, ${ctx.update.message.from.first_name}! I'm Nenoy 🐶, ` +
        `your personal assistant. I'll be taught many tricks for you in the future.\n\n` +
        `For now, I'll take care of your puzzle scores. ` +
        `Just send them to me and I'll ship it into your website! 🚀`
    )
})
bot.help((ctx) => ctx.reply('Send me your puzzle results and I\'ll ship them into your website! 🚀'))

bot.on('message', mainController)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
