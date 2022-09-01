const CAUSE = {
    ErrorResponse: 'error-response',
    NoResponse: 'no-response',
    NotSent: 'not-sent',
    Unknown: 'unknown',
}

const ERROR_MESSAGE = {
    [CAUSE.ErrorResponse]: 'Server had problems with the request',
    [CAUSE.NoResponse]: 'We can\'t talk to the server at this time 😵. Please try again later 🙏🏼',
    [CAUSE.NotSent]: 'I had trouble serving this request 😵. My hooman should fix me.',
    [CAUSE.Unknown]: 'I had some trouble serving this request 😵'
}

module.exports.CAUSE = CAUSE
module.exports.ERROR_MESSAGE = ERROR_MESSAGE
