let puzzlesArray
try {
  puzzlesArray = require('./puzzles.generated.json')
} catch (err) {
  console.error(`[puzzles] Failed to load puzzles.generated.json: ${err.message}`)
  puzzlesArray = []
}

const puzzles = {}
for (const p of puzzlesArray) {
  puzzles[p.name] = {
    displayName: p.displayName,
    emoji: p.emoji,
    link: p.link,
    resultPattern: new RegExp(p.resultPattern),
    ...(p.isScoreDarkMode && { isScoreDarkMode: true }),
  }
}

module.exports = puzzles
