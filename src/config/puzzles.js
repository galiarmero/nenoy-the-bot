const puzzlesArray = require('./puzzles.generated.json')

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

console.log(`[puzzles] Loaded ${puzzlesArray.length} puzzles: ${Object.keys(puzzles).join(', ')}`)

module.exports = puzzles
