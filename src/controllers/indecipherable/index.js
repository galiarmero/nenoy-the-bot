const handleIndecipherable = async (ctx) => {
    await ctx.reply(
        'I have been summoned πͺπΌπΆ. ' +
        'But I don\'t know what for π΅βπ«\n\n' +
        'Please press /help.'
    )
}

module.exports = handleIndecipherable
