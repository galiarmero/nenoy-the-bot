require('dotenv').config()
const axios = require('axios')
const fs = require('fs')
const path = require('path')

const OUT_PATH = path.join(__dirname, '..', 'src', 'config', 'puzzles.generated.json')

async function main() {
  const { NENOY_API_BASE_URL, NENOY_API_USER, NENOY_API_PASS } = process.env

  if (!NENOY_API_BASE_URL || !NENOY_API_USER || !NENOY_API_PASS) {
    throw new Error('Missing required env vars: NENOY_API_BASE_URL, NENOY_API_USER, NENOY_API_PASS')
  }

  console.log(`Fetching puzzles from ${NENOY_API_BASE_URL}/puzzles ...`)

  const res = await axios.get('/puzzles', {
    baseURL: NENOY_API_BASE_URL,
    auth: { username: NENOY_API_USER, password: NENOY_API_PASS },
    timeout: 10000,
  })

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
