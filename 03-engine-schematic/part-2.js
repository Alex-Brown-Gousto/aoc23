const fs = require("fs");
const util = require("util");
const { parseSchematic } = require("./parse");

const input = fs.readFileSync("./input.txt", "utf8");

const engine = parseSchematic(input);

const stars = engine.symbols.filter(({ symbol }) => symbol === "*");

const starNumbers = stars.map(({ i: si, j: sj }) =>
  engine.numbers.filter(
    ({ i, j, length }) =>
      si >= i - 1 && si <= i + 1 && sj >= j - 1 && sj < j + length + 1
  )
);

const gears = starNumbers.filter((numbers) => numbers.length === 2);
const gearRatios = gears.map(([a, b]) => a.value * b.value);

const sum = gearRatios.reduce((sum, value) => sum + value, 0);
console.log(sum);
