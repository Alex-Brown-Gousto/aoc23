const fs = require("fs");

const sum = (arr) => arr.reduce((acc, curr) => acc + curr, 0);

const digit = /(\d|one|two|three|four|five|six|seven|eight|nine)/;
const reverseDigit = /.*(\d|one|two|three|four|five|six|seven|eight|nine)/;

const digitMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const mapDigit = (str) => {
  if (digitMap[str]) {
    return digitMap[str];
  }
  return str;
};

const matchDigits = (str) => {
  const match = str.match(digit);
  console.log(str, match, {
    first: mapDigit(str.match(digit)[1]),
    last: mapDigit(str.match(reverseDigit)[1]),
  });
  return {
    first: mapDigit(str.match(digit)[1]),
    last: mapDigit(str.match(reverseDigit)[1]),
  };
};

const data = fs
  .readFileSync("./part-2-input.txt", "utf8")
  .split("\n")
  .filter((line) => line.length > 0);

const values = data
  .map((line) => matchDigits(line))
  .map(({ first, last }) => Number(`${first}${last}`));

console.log(values);
console.log(sum(values));
