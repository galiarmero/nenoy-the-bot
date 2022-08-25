const MESSAGE_TYPES = require('./message-types')
const { isPuzzleScore } = require('./puzzle-scores')

const DEDUCERS_BY_TYPE = {
    [MESSAGE_TYPES.PUZZLE_SCORES]: isPuzzleScore,
}

module.exports.DEDUCERS_BY_TYPE = DEDUCERS_BY_TYPE
