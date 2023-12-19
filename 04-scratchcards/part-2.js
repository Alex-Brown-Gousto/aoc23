const fs = require("fs");
const util = require("util");

const { parseScratchcards } = require("./parse");

const input = fs.readFileSync("./input.txt", "utf8");

const scratchcards = parseScratchcards(input).map((card) => ({
  ...card,
  copyCount: 1,
}));

for (let i = 0; i < scratchcards.length; i++) {
  const card = scratchcards[i];

  const winCount = card.cardNumbers.filter((cardNumber) =>
    card.winningNumbers.includes(cardNumber)
  ).length;

  card.winCount = winCount;

  for (let j = i + 1; j < i + 1 + winCount; j++) {
    scratchcards[j].copyCount += card.copyCount;
  }
}

const total = scratchcards.reduce((sum, card) => sum + card.copyCount, 0);

console.log(total);
