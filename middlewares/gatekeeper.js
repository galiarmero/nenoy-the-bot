const gatekeeper = (ctx, next) => {
    const ALLOWED_USER_IDS = (process.env.ALLOWED_USER_IDS || "")
                                .split(',').map((i) => parseInt(i.trim()))

    console.log(ALLOWED_USER_IDS)
    if (ALLOWED_USER_IDS.includes(ctx.update.message.from.id)) {
        return next()
    }

    console.log(ctx.update.message.from)
    const { id, username } = ctx.update.message.from
    console.log(`Unauthorized access from ${id} (${username})`)
}

module.exports = gatekeeper