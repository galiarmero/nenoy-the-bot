
const isPuzzleScore = (ctx) => {
    const { text } = ctx.update.message

    if (/^Wordle\s*\d+/.test(text)) return true
    if (/^Daily Quordle\s*\d+/.test(text)) return true
    if (/^\#Worldle\s*\#\d+/.test(text)) return true
    if (/^Saltong\s*\d+/.test(text)) return true
    if (/^Saltong Mini\s*\d+/.test(text)) return true

    return false
}

const handlePuzzleScore = (ctx) => {
    ctx.reply('Good job on this puzzle. Say no more 😉', {
        reply_to_message_id: ctx.message.message_id
    })
}

module.exports = handlePuzzleScore
module.exports.isPuzzleScore = isPuzzleScore
