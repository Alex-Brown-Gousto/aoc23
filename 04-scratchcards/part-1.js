const fs = require("fs");
const util = require("util");

const { parseScratchcards } = require("./parse");

const input = fs.readFileSync("./input.txt", "utf8");

const scratchcards = parseScratchcards(input);

const winningNumbersPresent = scratchcards.map(
  ({ winningNumbers, cardNumbers }) =>
    cardNumbers.filter((cardNumber) => winningNumbers.includes(cardNumber))
);

const scores = winningNumbersPresent.map((numbers) =>
  numbers.length === 0 ? 0 : Math.pow(2, numbers.length - 1)
);

const total = scores.reduce((sum, score) => sum + score, 0);

console.log(total);
