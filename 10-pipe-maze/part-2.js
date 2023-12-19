const fs = require("fs");
const {
  parseMaze,
  getStartExits,
  areSamePosition,
  advance,
  cliMap,
} = require("./util");

const input = fs.readFileSync("./input.txt", "utf8");

const { maze, start } = parseMaze(input, true);

console.log(input);

const findLoop = (maze, start) => {
  let previousPosition = start;
  let startExits = getStartExits(maze, start);

  let currentPosition = startExits[0];

  let loopCells = [
    {
      pos: start,
      cell: maze[start[1]][start[0]],
    },
  ];

  while (!areSamePosition(currentPosition, start)) {
    let prev = currentPosition;
    let next = advance(maze, currentPosition, previousPosition);

    const cell = maze[currentPosition[1]][currentPosition[0]];

    loopCells.push({
      pos: currentPosition,
      cell,
    });

    currentPosition = next;
    previousPosition = prev;
  }

  return loopCells;
};

const loopCells = findLoop(maze, start);

const isCellWithinLoop = (cell) => {
  let count = 0;

  let fromTop = false;
  let fromBottom = false;

  for (let x = cell[0] - 1; x >= 0; x--) {
    const testPosition = [x, cell[1]];
    const testCell = loopCells.find((c) =>
      areSamePosition(c.pos, testPosition)
    );

    if (testCell) {
      if (testCell.cell === "|") {
        count++;
      } else if (testCell.cell === "J" && !fromTop) {
        fromTop = true;
      } else if (testCell.cell === "L") {
        if (fromTop) {
          fromTop = false;
        }
        if (fromBottom) {
          count++;
          fromBottom = false;
        }
      } else if (testCell.cell === "7" && !fromBottom) {
        fromBottom = true;
      } else if (testCell.cell === "F") {
        if (fromBottom) {
          fromBottom = false;
        }
        if (fromTop) {
          count++;
          fromTop = false;
        }
      }
    }
  }

  return count % 2 === 1;
};
console.log("\n -- Winding -- \n");
const inLoop = [];
for (let y = 0; y < maze.length; y++) {
  let line = "";
  for (let x = 0; x < maze[y].length; x++) {
    const cellInLoop = loopCells.find((c) => areSamePosition(c.pos, [x, y]));
    const cell = maze[y][x];
    const cellWithinLoop = !cellInLoop && isCellWithinLoop([x, y]);
    line += cellInLoop ? cliMap.get(cell) : cellWithinLoop ? "W" : ".";
    if (cellWithinLoop) {
      inLoop.push([x, y]);
    }
  }
  console.log(line);
}

console.log(inLoop.length);
