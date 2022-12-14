const axios = require('axios')

const {
    requestInterceptor,
    requestErrorInterceptor,
    responseInterceptor,
    responseErrorInterceptor
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
nenoyApi.interceptors.request.use(requestInterceptor, requestErrorInterceptor)
nenoyApi.interceptors.response.use(responseInterceptor, responseErrorInterceptor)

const addPuzzleScore = async (newPuzzleScore) => {
    return nenoyApi.post('/puzzle-scores', newPuzzleScore);
}

module.exports.addPuzzleScore = addPuzzleScore
