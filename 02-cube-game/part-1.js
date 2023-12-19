const fs = require("fs");
const { parseGame } = require("./lib");

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

const games = input.map((line) => parseGame(line));

const maxCubeCounts = {
  red: 12,
  green: 13,
  blue: 14,
};

const allowedGames = games.filter((game) =>
  game.rounds.every(({ cubes }) =>
    cubes.every(({ color, number }) => number <= maxCubeCounts[color])
  )
);

const sum = allowedGames.reduce((acc, { gameNumber }) => acc + gameNumber, 0);

console.log(sum);
