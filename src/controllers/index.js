const { deduceMessageType, getHandler } = require('./concierge')

const mainController = async (ctx) => {
    const type = deduceMessageType(ctx)
    handle = getHandler(type)

    const { text, from } = ctx.update.message
    console.log(`New message of type ${type} from ${from.id} (${from.username}): '${text}'`)

    await handle(ctx)
}

module.exports = mainController
