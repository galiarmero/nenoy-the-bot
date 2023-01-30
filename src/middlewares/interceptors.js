const { CAUSE } = require('../types/errors')

const requestInterceptor = (config) => {
    // Do something before request is sent
    return config;
}

const requestErrorInterceptor = (error) => {
    return Promise.reject(error);
}

const identifyCauseType = (error) => {
    if (!error) {
        return CAUSE.Unknown
    } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return CAUSE.ErrorResponse
    } else if (error.request) {
        console.log(error)
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return CAUSE.NoResponse
    }

    return CAUSE.NotSent;
}

module.exports.requestInterceptor = requestInterceptor
module.exports.requestErrorInterceptor = requestErrorInterceptor
module.exports.identifyCauseType = identifyCauseType
