const { deduceMessageType, getHandler } = require('./concierge')

const mainController = (ctx) => {
    console.log(ctx)
    const type = deduceMessageType(ctx)
    handle = getHandler(type)
    handle(ctx)
}

module.exports = mainController
