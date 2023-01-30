const { addPuzzleScore } = require('../../clients/nenoy-api')
const { CAUSE, ERROR_MESSAGE } = require('../../types/errors')
const { identifyCauseType } = require('../../middlewares/interceptors')

const isPuzzleScore = (ctx) => {
    const { text } = ctx.update.message

    if (/^Wordle\s*\d+/.test(text)) return true
    if (/^Daily Quordle\s*\d+/.test(text)) return true
    if (/^\#Worldle\s*\#\d+/.test(text)) return true
    if (/^Saltong (:?Mini\s*)?\d+/.test(text)) return true
    if (/^\#waffle\d+\s*/.test(text)) return true
    if (/^https:\/\/www.nytimes.com\/badges\/games\/mini.html*/.test(text)) return true
    if (/^Daily (:?Sequence\s*|Rescue\s*)?Octordle\s*\#\d+/.test(text)) return true

    return false
}

const handlePuzzleScore = async (ctx) => {
    const { text } = ctx.update.message

    let reply;
    try {
        await addPuzzleScore({ resultText: text })
        reply = `Good job on this puzzle. I gotchu 😉✅`
    } catch (error) {
        console.log(error)
        causeType = identifyCauseType(error)
        reply = ERROR_MESSAGE[causeType]
        if (causeType == CAUSE.ErrorResponse) {
            reply += `: ${e.response.data.message}`
        }
    }

    await ctx.reply(reply, { reply_to_message_id: ctx.message.message_id })
}

module.exports = handlePuzzleScore
module.exports.isPuzzleScore = isPuzzleScore
