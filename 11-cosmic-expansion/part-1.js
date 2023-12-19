const fs = require("fs");
const { parseInput, printSky, expandUniverse, getDistance } = require("./lib");

const input = fs.readFileSync("./input.txt", "utf8");

const sky = parseInput(input);

const expandedSky = expandUniverse(sky);
console.log(printSky(expandedSky));

const pairs = [];

for (let i = 0; i < expandedSky.galaxies.length; i++) {
  for (let j = i + 1; j < expandedSky.galaxies.length; j++) {
    pairs.push([expandedSky.galaxies[i], expandedSky.galaxies[j]]);
  }
}

const distances = pairs.map(([a, b]) => getDistance(a, b));

const sum = distances.reduce((sum, distance) => sum + distance, 0);

console.log(sum);
