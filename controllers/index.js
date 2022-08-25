const { deduceMessageType } = require('./concierge')

const mainController = (ctx) => {
    console.log(ctx)
    type = deduceMessageType(ctx)
    
    // TODO: Implement getting of handlers
    // handler = getHandler(type)
    ctx.reply(`That message was a '${type}'`)
}

module.exports = mainController
