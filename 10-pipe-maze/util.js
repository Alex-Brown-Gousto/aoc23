const exitsMap = new Map([
  [
    "|",
    [
      [0, -1],
      [0, 1],
    ],
  ],
  [
    "-",
    [
      [-1, 0],
      [1, 0],
    ],
  ],
  [
    "L",
    [
      [0, -1],
      [1, 0],
    ],
  ],
  [
    "J",
    [
      [0, -1],
      [-1, 0],
    ],
  ],
  [
    "7",
    [
      [0, 1],
      [-1, 0],
    ],
  ],
  [
    "F",
    [
      [0, 1],
      [1, 0],
    ],
  ],
  [".", []],
]);

const reverseMap = new Map(
  Array.from(exitsMap.entries()).map(([cell, exits]) => [
    exits.flat().join(","),
    cell,
  ])
);

const parseMaze = (input, convertStart = false) => {
  const maze = input
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.split(""));

  const startRow = maze.findIndex((row) => row.includes("S"));
  const startCol = maze[startRow].findIndex((cell) => cell === "S");

  const start = [startCol, startRow];

  if (convertStart) {
    const startExits = getStartExits(maze, start).map((exit) => [
      exit[0] - start[0],
      exit[1] - start[1],
    ]);

    const key = startExits.flat().join(",");
    const reversedKey = startExits.reverse().flat().join(",");

    maze[startRow][startCol] =
      reverseMap.get(key) || reverseMap.get(reversedKey);
  }

  return { maze, start };
};

const getSurroundingCells = ([x, y]) => [
  [x, y - 1],
  [x, y + 1],
  [x - 1, y],
  [x + 1, y],
];

const cellIsInBounds = (maze, [x, y]) =>
  y >= 0 && y < maze.length && x >= 0 && x < maze[y].length;

const getStartExits = (maze, start) => {
  const surroundingCells = getSurroundingCells(start).filter((cell) =>
    cellIsInBounds(maze, cell)
  );
  return surroundingCells.filter((adjacentCell) => {
    const exits = getExits(maze, adjacentCell);
    return exits.some((exit) => areSamePosition(exit, start));
  });
};

const getExits = (maze, [x, y]) => {
  const cell = maze[y][x];
  const exits = exitsMap.get(cell);

  return exits.map(([dx, dy]) => [x + dx, y + dy]);
};

const areSamePosition = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;

const advance = (maze, currentPosition, previousPosition) => {
  const exits = getExits(maze, currentPosition);

  return exits.find((exit) => !areSamePosition(exit, previousPosition));
};

const cliMap = new Map([
  ["|", "│"],
  ["-", "─"],
  ["7", "┐"],
  ["F", "┌"],
  ["J", "┘"],
  ["L", "└"],
]);

module.exports = {
  exitsMap,
  cliMap,
  getStartExits,
  getExits,
  parseMaze,
  areSamePosition,
  advance,
};
