const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

const parseInput = (input) => {
  const fixed = [];
  const free = [];

  for (let y = 0; y < input.length; y++) {
    const line = input[y];
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === "#") {
        fixed.push({ x, y });
      } else if (char === "O") {
        free.push({ x, y });
      }
    }
  }

  return { fixed, free, width: input[0].length, height: input.length };
};

const printDish = ({ fixed, free, width, height }) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (fixed.some(({ x: fx, y: fy }) => fx === x && fy === y)) {
        process.stdout.write("#");
      } else if (free.some(({ x: fx, y: fy }) => fx === x && fy === y)) {
        process.stdout.write("O");
      } else {
        process.stdout.write(".");
      }
    }
    process.stdout.write("\n");
  }
};

const { fixed, free, width, height } = parseInput(input);

console.log(fixed, free, width, height);

printDish({ fixed, free, width, height });

const moveFreeRocks = ({ fixed, free, width, height }, direction = "N") => {
  const axis = direction === "N" || direction === "S" ? "y" : "x";
  const sign = direction === "N" || direction === "W" ? -1 : 1;
  const max = direction === "N" || direction === "S" ? height : width;
  const newFree = [];
  const findFreePosition = (x, y) => {
    // console.log(`Finding free position for ${x}, ${y}`);
    const fixedCoordinate = axis === "y" ? x : y;
    const startPos = axis === "y" ? y : x;
    let dist = 0;
    for (
      let testCoordinate = startPos + sign;
      sign < 0 ? testCoordinate >= 0 : testCoordinate < max;
      testCoordinate += sign
    ) {
      const tester = ({ x: fx, y: fy }) =>
        fx === (axis === "y" ? fixedCoordinate : testCoordinate) &&
        fy === (axis === "x" ? fixedCoordinate : testCoordinate);
      if (!fixed.some(tester) && !free.some(tester)) {
        dist++;
      }
      if (fixed.some(tester)) {
        break;
      }
    }
    const moved = startPos + sign * dist;
    return {
      x: axis === "x" ? moved : fixedCoordinate,
      y: axis === "y" ? moved : fixedCoordinate,
    };
  };
  for (let i = 0; i < free.length; i++) {
    const { x, y } = free[i];
    const { x: newX, y: newY } = findFreePosition(x, y);
    newFree.push({ x: newX, y: newY });
  }
  return { fixed, free: newFree, width, height };
};

const getSupportWeight = ({ free, height }) =>
  free.reduce((acc, { y }) => acc + height - y, 0);

const serialiseDish = ({ free, width }) =>
  free
    .map(({ x, y }) => y * width + x)
    .sort((a, b) => a - b)
    .join("|");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const findCycle = (maxCycle = 6000) => {
  const directions = "NWSE".split("");
  const states = new Map();
  const orderedStates = [];
  let cycle = 0;
  let dish = { fixed, free, width, height };

  while (cycle < maxCycle) {
    const direction = directions[cycle % directions.length];
    dish = moveFreeRocks(dish, direction);

    console.log(`Cycle ${cycle} (${direction}):`);
    // printDish(dish);
    console.log(`\nWeight: ${getSupportWeight(dish)}`);
    // console.log(`Serialised: ${serialiseDish(dish)}`);
    console.log("\n");

    const key = `${direction}-${serialiseDish(dish)}`;

    if (states.has(key)) {
      console.log("Found cycle!");
      orderedStates.push({ dish, weight: getSupportWeight(dish), cycle });
      return { prev: states.get(key).cycle, current: cycle, orderedStates };
    }

    states.set(key, { cycle });
    orderedStates.push({ dish, weight: getSupportWeight(dish), cycle });

    cycle++;
  }
};

let cycle = findCycle();

const { prev, current, orderedStates } = cycle;
const cycleLength = current - prev;

const getDishAtCycle = (cycle) => {
  let i = cycle * 4 - 1;
  console.log(
    "find cycle",
    cycle,
    Math.min(prev, i) + ((i - prev) % cycleLength)
  );
  return orderedStates[Math.min(prev, i) + ((i - prev) % cycleLength)];
};

const getWeight = (cycle) => getDishAtCycle(cycle).weight;

console.log(1000000000, getWeight(1000000000));
