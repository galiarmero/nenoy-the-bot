const { deduceMessageType, getHandler } = require('./concierge')

const mainController = async (ctx) => {
    console.log(ctx)
    const type = deduceMessageType(ctx)
    handle = getHandler(type)
    await handle(ctx)
}

module.exports = mainController
