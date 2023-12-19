const fs = require("fs");
const { parseGame } = require("./lib");

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

const games = input.map((line) => parseGame(line));

const minCubeCountsPerGame = games.map(({ rounds }) =>
  rounds.reduce(
    (acc, { cubes }) => {
      cubes.forEach(({ color, number }) => {
        if (acc[color] === undefined || number > acc[color]) {
          acc[color] = number;
        }
      });

      return acc;
    },
    {
      red: 0,
      blue: 0,
      green: 0,
    }
  )
);

const powers = minCubeCountsPerGame.map(
  (minCubeCounts) =>
    minCubeCounts.red * minCubeCounts.blue * minCubeCounts.green
);

const sum = powers.reduce((acc, power) => acc + power, 0);

console.log(sum);
