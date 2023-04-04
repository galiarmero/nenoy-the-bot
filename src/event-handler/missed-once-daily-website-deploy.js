const missedOnceDailyWebsiteDeployHandler = async (app, request, reply) => {
    console.log(request.body.lastSuccessfulDeployDate)
    const lastSuccessfulDeployDate = new Date(request.body.lastSuccessfulDeployDate)
    const message = `⚠️ galiarmero\\.dev was not deployed yesterday\\. ` +
                    `Last successful deploy was ${lastSuccessfulDeployDate.toDateString()}\\.`

    await Promise.all(app.config.NOTIF_CHAT_IDS.map(async (chatId) => {
        await app.bot.telegram.sendMessage(
            chatId,
            message,
            {
                parse_mode: 'MarkdownV2',
                disable_web_page_preview: true,
            }
        )
    }))
    return reply.send()
}

module.exports = missedOnceDailyWebsiteDeployHandler
