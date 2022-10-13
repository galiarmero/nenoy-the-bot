const { addPuzzleScore } = require('../../clients/nenoy-api')
const { CAUSE, ERROR_MESSAGE } = require('../../types/errors')

const isPuzzleScore = (ctx) => {
    const { text } = ctx.update.message

    if (/^Wordle\s*\d+/.test(text)) return true
    if (/^Daily Quordle\s*\d+/.test(text)) return true
    if (/^\#Worldle\s*\#\d+/.test(text)) return true
    if (/^Saltong\s*\d+/.test(text)) return true
    if (/^Saltong Mini\s*\d+/.test(text)) return true

    return false
}

const handlePuzzleScore = async (ctx) => {
    const { text } = ctx.update.message

    let reply;
    try {
        await addPuzzleScore({ resultText: text })
        reply = `Good job on this puzzle. I gotchu 😉✅`
    } catch (error) {
        reply = ERROR_MESSAGE[error.causeType]
        if (error.causeType == CAUSE.ErrorResponse) {
            reply += `: ${error.response.data.message}`
        }
    }

    await ctx.reply(reply, { reply_to_message_id: ctx.message.message_id })
}

module.exports = handlePuzzleScore
module.exports.isPuzzleScore = isPuzzleScore
