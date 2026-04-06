require('dotenv').config()
const axios = require('axios')
const axiosRetry = require('axios-retry')
const fs = require('fs')
const path = require('path')

const OUT_PATH = path.join(__dirname, '..', 'src', 'config', 'puzzles.generated.json')

async function main() {
  const {
    NENOY_API_BASE_URL,
    NENOY_API_USER,
    NENOY_API_PASS,
    NENOY_API_TIMEOUT,
    NENOY_API_RETRY_MAX,
    NENOY_API_RETRY_DELAY,
  } = process.env

  if (!NENOY_API_BASE_URL || !NENOY_API_USER || !NENOY_API_PASS) {
    throw new Error('Missing required env vars: NENOY_API_BASE_URL, NENOY_API_USER, NENOY_API_PASS')
  }

  const retries = NENOY_API_RETRY_MAX ?? 5
  const retryDelay = NENOY_API_RETRY_DELAY ?? 10000

  const client = axios.create({
    baseURL: NENOY_API_BASE_URL,
    auth: { username: NENOY_API_USER, password: NENOY_API_PASS },
    timeout: NENOY_API_TIMEOUT ?? 5000,
  })
  axiosRetry(client, {
    retries,
    retryDelay: () => retryDelay,
    shouldResetTimeout: true,
    retryCondition: (error) =>
      axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNABORTED',
    onRetry: (retryCount, error) => {
      console.log(`Retry ${retryCount}/${retries} after: ${error.message}`)
    },
  })

  console.log(`Fetching puzzles from ${NENOY_API_BASE_URL}/puzzles ...`)

  const res = await client.get('/puzzles')

  const { puzzles } = res.data
  if (!Array.isArray(puzzles) || puzzles.length === 0) {
    throw new Error('API returned an empty or invalid puzzles array')
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(puzzles, null, 2) + '\n')
  console.log(`Wrote ${puzzles.length} puzzles to ${OUT_PATH}`)
}

main().catch(err => {
  console.error('Failed to fetch puzzles:', err.message)
  process.exit(1)
})
