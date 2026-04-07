const PUZZLES = require('../../config/puzzles')

const handleIndecipherable = async (ctx) => {
    const puzzleNames = Object.keys(PUZZLES)
    await ctx.reply(
        'I have been summoned 💪🏼🐶. ' +
        'But I don\'t know what for 😵‍💫\n\n' +
        'Please press /help.\n\n' +
        `[DEBUG] ${puzzleNames.length} puzzles loaded: ${puzzleNames.join(', ')}`
    )
}

module.exports = handleIndecipherable
