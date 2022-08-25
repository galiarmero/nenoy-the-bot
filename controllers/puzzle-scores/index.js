
const isPuzzleScore = (ctx) => {
    const { text } = ctx.update.message

    if (/^Wordle\s*\d+/.test(text)) return true
    if (/^Daily Quordle\s*\d+/.test(text)) return true
    if (/^\#Worldle\s*\#\d+/.test(text)) return true
    if (/^Saltong\s*\d+/.test(text)) return true
    if (/^Saltong Mini\s*\d+/.test(text)) return true

    return false
}

module.exports.isPuzzleScore = isPuzzleScore
