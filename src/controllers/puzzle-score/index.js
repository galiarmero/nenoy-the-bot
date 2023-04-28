const { addPuzzleScore } = require('../../clients/nenoy-api')
const { CAUSE, ERROR_MESSAGE } = require('../../types/errors')
const { identifyCauseType } = require('../../middlewares/interceptors')
const PUZZLES = require('../../config/puzzles')


const isPuzzleScore = (ctx) => {
    const { text } = ctx.update.message

    return Object.values(PUZZLES).some(p => p.resultPattern.test(text))
}

const handlePuzzleScore = async (ctx) => {
    const { text } = ctx.update.message

    let reply;
    try {
        await addPuzzleScore({ resultText: text })
        reply = `Good job on this puzzle. I gotchu 😉✅`
    } catch (error) {
        console.log(`Error encountered: ${error}`)
        causeType = identifyCauseType(error)
        console.log(`Cause type: ${causeType}`)
        reply = ERROR_MESSAGE[causeType]
        if (causeType == CAUSE.ErrorResponse) {
            reply += `: ${e.response.data.message}`
        }
    }

    await ctx.reply(reply, { reply_to_message_id: ctx.message.message_id })
}

module.exports = handlePuzzleScore
module.exports.isPuzzleScore = isPuzzleScore
