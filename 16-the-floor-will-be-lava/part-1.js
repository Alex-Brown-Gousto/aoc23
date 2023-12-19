const fs = require("fs");
const { parse, addVectors, printDirection } = require("./lib");

const input = fs.readFileSync("./input.txt", "utf-8");

const { components, width, height } = parse(input);

let beams = [{ loc: { x: 0, y: 0 }, dir: { x: 1, y: 0 } }];

const energisedCells = new Map();

const stepBeam = (beam) => {
  const cell = components.find(
    (component) => component.x === beam.loc.x && component.y === beam.loc.y
  );

  if (!cell) {
    return [{ loc: addVectors(beam.loc, beam.dir), dir: beam.dir }];
  }
  if (cell.type === "/") {
    const newDir = { x: -beam.dir.y, y: -beam.dir.x };
    return [
      {
        loc: addVectors(beam.loc, newDir),
        dir: newDir,
      },
    ];
  }
  if (cell.type === "\\") {
    const newDir = { x: beam.dir.y, y: beam.dir.x };
    return [
      {
        loc: addVectors(beam.loc, newDir),
        dir: newDir,
      },
    ];
  }
  if (cell.type === "-" && beam.dir.y !== 0) {
    const newDirs = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
    ];
    return newDirs.map((newDir) => ({
      loc: addVectors(beam.loc, newDir),
      dir: newDir,
    }));
  }

  if (cell.type === "|" && beam.dir.x !== 0) {
    const newDirs = [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];
    return newDirs.map((newDir) => ({
      loc: addVectors(beam.loc, newDir),
      dir: newDir,
    }));
  }

  return [{ loc: addVectors(beam.loc, beam.dir), dir: beam.dir }];
};

const removeEscapedBeams = (beams) => {
  return beams.filter(
    (beam) =>
      beam.loc.x >= 0 &&
      beam.loc.x < width &&
      beam.loc.y >= 0 &&
      beam.loc.y < height
  );
};

const removePropagatedBeams = (beams) => {
  return beams.filter((beam) => {
    const key = `${beam.loc.x},${beam.loc.y}`;
    const dirs = energisedCells.get(key);
    return (
      !dirs || !dirs.find((dir) => dir.x === beam.dir.x && dir.y === beam.dir.y)
    );
  });
};

const addToEnergisedCells = (beam) => {
  const key = `${beam.loc.x},${beam.loc.y}`;
  let dirs = energisedCells.get(key) || [];
  dirs.push(beam.dir);
  energisedCells.set(key, dirs);
};

beams.forEach(addToEnergisedCells);

const step = () => {
  beams = beams.flatMap(stepBeam);
  beams = removeEscapedBeams(beams);
  beams = removePropagatedBeams(beams);
  beams.forEach(addToEnergisedCells);
};

const printEnergisedCells = () => {
  for (let y = 0; y < height; y++) {
    let row = "";
    for (let x = 0; x < width; x++) {
      const key = `${x},${y}`;
      let dirs = energisedCells.get(key);
      if (dirs && dirs.length > 1) {
        row += dirs.length;
      } else if (dirs && dirs.length === 1) {
        row += printDirection(dirs[0]);
      } else {
        row += ".";
      }
    }
    console.log(row);
  }
  console.log();
};

const main = async () => {
  while (beams.length > 0) {
    step();
    printEnergisedCells();
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log(energisedCells.size);
};

main();
