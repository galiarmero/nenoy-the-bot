const { deployWebsite } = require('../clients/nenoy-api')
const { CAUSE, ERROR_MESSAGE } = require('../types/errors')
const { identifyCauseType } = require('../middlewares/interceptors')

const isDeploy = (ctx) => {
    const { text } = ctx.update.message

    if (text === '/deploysite') return true

    return false
}

const handleDeploy = async (ctx) => {
    const { text } = ctx.update.message

    if (text !== '/deploysite') return

    try {
        await deployWebsite()
    } catch (error) {
        console.log(`Error encountered: ${error}`)
        causeType = identifyCauseType(error)
        console.log(`Cause type: ${causeType}`)
        let reply = ERROR_MESSAGE[causeType]
        if (causeType == CAUSE.ErrorResponse) {
            reply += `: ${e.response.data.message}`
        }

        await ctx.reply(reply, { reply_to_message_id: ctx.message.message_id })
    }
}

module.exports = handleDeploy
module.exports.isDeploy = isDeploy
