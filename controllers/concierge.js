const { DEDUCERS_BY_TYPE } = require('./type-mappings')
const { INDECIPHERABLE } = require('./message-types')

const deduceMessageType = (ctx) =>
    Object.entries(DEDUCERS_BY_TYPE).reduce(
        (deducedType, [type, isOfThisType]) => deducedType ?? isOfThisType(ctx) ? type : null,
        null
    )
    ?? INDECIPHERABLE

module.exports.deduceMessageType = deduceMessageType
