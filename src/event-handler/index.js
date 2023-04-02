const websiteDeployHandler = require('./website-deploy')

const eventHandler = async (app, request, reply) => {
    const { eventType } = request.params
    switch (eventType) {
        case 'website-deploys':
            return websiteDeployHandler(app, request, reply)
        default:
            return reply.code(404).send()
    }
}

module.exports = eventHandler
