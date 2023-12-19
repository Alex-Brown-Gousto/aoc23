const fs = require("fs");
const util = require("util");
const { parseSchematic } = require("./parse");

const input = fs.readFileSync("./input.txt", "utf8");

const engine = parseSchematic(input);

const includedParts = engine.numbers.filter(({ i, j, length }) =>
  engine.symbols.some(
    ({ i: si, j: sj }) =>
      si >= i - 1 && si <= i + 1 && sj >= j - 1 && sj < j + length + 1
  )
);

const sum = includedParts.reduce((sum, { value }) => sum + value, 0);

console.log(sum);
