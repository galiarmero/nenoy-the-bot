---
name: add-puzzle-type
description: >-
  Add a new recognized puzzle type to the Telegram bot. Use when the user wants
  to support a new puzzle game, add a puzzle, or recognize a new type of shared
  puzzle score.
---

# Adding a New Puzzle Type

## Overview

This bot recognizes puzzle score messages in Telegram and forwards them to the nenoy API. Puzzle types are defined as entries in a single config file. No other files need modification — detection is automatic via regex, and server-side parsing is handled by the nenoy API.

## The Only File to Edit

`src/config/puzzles.js`

## Gather Information

Before making changes, collect the following from the user. Use the AskQuestion tool when available; otherwise ask conversationally.

1. **Puzzle name** — the human-readable name of the game (e.g. "Connections", "Wordle")
2. **Puzzle link** — the URL where the game is played
3. **Example share text** — a full copy-paste of the text the game produces when a player shares their result (this is what the bot will match against)

## Derive the Entry Fields

Each puzzle entry in `src/config/puzzles.js` has this shape:

```javascript
"puzzle-id": {
  displayName: "Human Name",
  emoji: '🟩',
  link: 'https://example.com/game',
  resultPattern: /^FirstLinePattern/,
},
```

### Key (`"puzzle-id"`)

- Lowercase, kebab-case (e.g. `"nytimes-mini-crossword"`, `connections`)
- If it's a single word that's a valid JS identifier, quotes are optional
- Must be unique across existing entries

### `displayName`

The human-readable game name, title-cased (e.g. `"Sequence Octordle"`, `"Wordle"`).

### `emoji`

Scan the user-provided share text for emojis. If any are found, suggest one or more as candidates for the `emoji` field — present these as options using AskQuestion if available. Always include a "Custom emoji" option so the user can provide their own. If no emojis appear in the share text, ask the user to provide a custom emoji directly.

### `link`

The URL to play the game.

### `resultPattern`

A JavaScript regex that matches the **first line** of the share text. Conventions:

- Anchor with `^`
- Use `\s*` or `\s+` for flexible whitespace
- Use `\d+` for puzzle numbers
- Use `\#` for literal `#` characters
- Escape any other regex-special characters in the share text

## Example

The Connections game was added with this entry:

```javascript
connections: {
  displayName: "Connections",
  emoji: '🟪',
  link: 'https://www.nytimes.com/games/connections',
  resultPattern: /^Connections\s*/,
},
```

Its share text starts with `Connections` followed by a puzzle number line, so `resultPattern` anchors on that first word.

## Steps

1. Read `src/config/puzzles.js` to see existing entries
2. Ask the user for the puzzle name, link, and example share text
3. Derive `resultPattern` from the first line of the share text
4. Pick an emoji (suggest from share text or ask for a custom one)
5. Append the new entry before the closing `}` in the module.exports object
6. Verify the regex doesn't accidentally match any existing puzzle's share text pattern
