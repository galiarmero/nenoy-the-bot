const websiteDeployHandler = require('./website-deploy')
const unplayedPuzzlesHandler = require('./unplayed-puzzles')
const missedOnceDailyWebsiteDeploy = require('./missed-once-daily-website-deploy')

const eventHandler = async (app, request, reply) => {
    const { eventType } = request.params
    switch (eventType) {
        case 'website-deploys':
            return websiteDeployHandler(app, request, reply)
        case 'unplayed-puzzles':
            return unplayedPuzzlesHandler(app, request, reply)
        case 'missed-once-daily-website-deploy':
            return missedOnceDailyWebsiteDeploy(app, request, reply)
        default:
            return reply.code(404).send()
    }
}

module.exports = eventHandler
