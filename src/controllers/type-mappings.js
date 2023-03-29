const MESSAGE_TYPES = require('./message-types')
const handlePuzzleScore = require('./puzzle-score')
const handleDeploy = require('./deploys')
const handleIndecipherable = require('./indecipherable')

const { isPuzzleScore } = require('./puzzle-score')
const { isDeploy } = require('./deploys')

const DEDUCERS_BY_TYPE = {
    [MESSAGE_TYPES.PUZZLE_SCORES]: isPuzzleScore,
    [MESSAGE_TYPES.DEPLOYS]: isDeploy,
}

const HANDLERS_BY_TYPE = {
    [MESSAGE_TYPES.PUZZLE_SCORES]: handlePuzzleScore,
    [MESSAGE_TYPES.DEPLOYS]: handleDeploy,
    [MESSAGE_TYPES.INDECIPHERABLE]: handleIndecipherable,
}

module.exports.DEDUCERS_BY_TYPE = DEDUCERS_BY_TYPE
module.exports.HANDLERS_BY_TYPE = HANDLERS_BY_TYPE
