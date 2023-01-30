const axios = require('axios')
const axiosRetry = require('axios-retry')

const {
    requestInterceptor,
    requestErrorInterceptor,
} = require('../middlewares/interceptors')

const NENOY_API_BASE_URL = process.env.NENOY_API_BASE_URL ?? 'http://127.0.0.1:3000'
const nenoyApi = axios.create({
    baseURL: NENOY_API_BASE_URL,
    auth: {
      username: process.env.NENOY_API_USER,
      password: process.env.NENOY_API_PASS,
    },
    timeout: process.env.NENOY_API_TIMEOUT,
})
axiosRetry(nenoyApi, {
    retries: process.env.NENOY_API_RETRY_MAX,
    retryDelay: () => process.env.NENOY_API_RETRY_DELAY,
    onRetry: (retryCount, error, requestConfig) => {
        console.log(`Attempting retry number ${retryCount} after error: ${error}`)
        return;
    },
})
nenoyApi.interceptors.request.use(requestInterceptor, requestErrorInterceptor)

const addPuzzleScore = async (newPuzzleScore) => {
    return nenoyApi.post('/puzzle-scores', newPuzzleScore);
}

module.exports.addPuzzleScore = addPuzzleScore
