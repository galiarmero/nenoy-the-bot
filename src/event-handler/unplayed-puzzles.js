const PUZZLES = require('../config/puzzles')

const unplayedPuzzlesHandler = async (app, request, reply) => {
    const { unplayedPuzzles } = request.body

    if (!Array.isArray(unplayedPuzzles) || unplayedPuzzles.length == 0) return reply.send()

    let reminder = unplayedPuzzles.reduce((message, puzzleId) => {
        const puzzle = PUZZLES[puzzleId]
        return `${message}\n  • ${puzzle.emoji} [${puzzle.displayName}](${puzzle.link})`
    }, `📢 Friendly reminder that you haven't played some puzzles yet today:\n`)

    await Promise.all(app.config.NOTIF_CHAT_IDS.map(async (chatId) => {
        await app.bot.telegram.sendMessage(
            chatId,
            reminder,
            {
                parse_mode: 'MarkdownV2',
                disable_web_page_preview: true,
            }
        )
    }))
    return reply.send()
}

module.exports = unplayedPuzzlesHandler
