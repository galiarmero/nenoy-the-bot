const websiteDeployHandler = require('./website-deploy')
const unplayedPuzzlesHandler = require('./unplayed-puzzles')

const eventHandler = async (app, request, reply) => {
    const { eventType } = request.params
    switch (eventType) {
        case 'website-deploys':
            return websiteDeployHandler(app, request, reply)
        case 'unplayed-puzzles':
            return unplayedPuzzlesHandler(app, request, reply)
        default:
            return reply.code(404).send()
    }
}

module.exports = eventHandler
