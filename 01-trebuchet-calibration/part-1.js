const fs = require("fs");

const reverseString = (str) => str.split("").reverse().join("");

const sum = (arr) => arr.reduce((acc, curr) => acc + curr, 0);

const data = fs
  .readFileSync("./part-1-input.txt", "utf8")
  .split("\n")
  .filter((line) => line.length > 0);

const values = data
  .map((line) => ({
    first: line.match(/(\d)/)[1],
    last: reverseString(line).match(/(\d)/)[1],
  }))
  .map(({ first, last }) => Number(`${first}${last}`));

console.log(sum(values));
