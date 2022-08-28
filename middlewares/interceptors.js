const { CAUSE } = require('../types/errors')

const requestInterceptor = (config) => {
    // Do something before request is sent
    return config;
}

const requestErrorInterceptor = (error) => {
    return Promise.reject(error);
}

const responseInterceptor = (response) => {
    return response;
}

const responseErrorInterceptor = (error) => {
    if (!error) {
        error = { causeType: CAUSE.Unknown }
    } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        error.causeType = CAUSE.ErrorResponse
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        error.causeType = CAUSE.NoResponse
    } else {
        // Something happened in setting up the request that triggered an Error
        error.causeType = CAUSE.NotSent
    }

    return Promise.reject(error);
}

module.exports.requestInterceptor = requestInterceptor
module.exports.requestErrorInterceptor = requestErrorInterceptor
module.exports.responseInterceptor = responseInterceptor
module.exports.responseErrorInterceptor = responseErrorInterceptor
