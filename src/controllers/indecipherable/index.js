const handleIndecipherable = async (ctx) => {
    await ctx.reply(
        'I have been summoned 💪🏼🐶. ' +
        'But I don\'t know what for 😵‍💫\n\n' +
        'Please press /help.'
    )
}

module.exports = handleIndecipherable
