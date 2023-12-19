const fs = require("fs");
const {
  parseMaze,
  getStartExits,
  areSamePosition,
  advance,
} = require("./util");

const input = fs.readFileSync("./input.txt", "utf8");

const { maze, start } = parseMaze(input);

const findFinish = (maze, start) => {
  const previousPositions = [start, start];
  const currentPositions = getStartExits(maze, start);

  let dist = 1;

  while (!areSamePosition(currentPositions[0], currentPositions[1])) {
    let prev0 = currentPositions[0];
    let prev1 = currentPositions[1];

    currentPositions[0] = advance(
      maze,
      currentPositions[0],
      previousPositions[0]
    );
    currentPositions[1] = advance(
      maze,
      currentPositions[1],
      previousPositions[1]
    );

    previousPositions[0] = prev0;
    previousPositions[1] = prev1;

    dist++;
  }

  return { finalPos: currentPositions[0], dist };
};

const finish = findFinish(maze, start);

console.log(finish);
