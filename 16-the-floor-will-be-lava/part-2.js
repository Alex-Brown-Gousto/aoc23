const fs = require("fs");
const { parse, addVectors, printDirection } = require("./lib");

const input = fs.readFileSync("./input.txt", "utf-8");

const { components, width, height } = parse(input);

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

const removePropagatedBeams = (beams, energisedCells) => {
  return beams.filter((beam) => {
    const key = `${beam.loc.x},${beam.loc.y}`;
    const dirs = energisedCells.get(key);
    return (
      !dirs || !dirs.find((dir) => dir.x === beam.dir.x && dir.y === beam.dir.y)
    );
  });
};

const addToEnergisedCells = (beam, energisedCells) => {
  const key = `${beam.loc.x},${beam.loc.y}`;
  let dirs = energisedCells.get(key) || [];
  dirs.push(beam.dir);
  energisedCells.set(key, dirs);
};

const step = (beams, energisedCells) => {
  beams = beams.flatMap(stepBeam);
  beams = removeEscapedBeams(beams);
  beams = removePropagatedBeams(beams, energisedCells);
  beams.forEach((beam) => addToEnergisedCells(beam, energisedCells));

  return beams;
};

const findEnergisedCells = (
  startBeam = { loc: { x: 0, y: 0 }, dir: { x: 1, y: 0 } }
) => {
  let beams = [startBeam];

  const energisedCells = new Map();

  beams.forEach((beam) => addToEnergisedCells(beam, energisedCells));
  while (beams.length > 0) {
    beams = step(beams, energisedCells);
  }

  return energisedCells.size;
};

const startBeams = [
  { loc: { x: 0, y: 0 }, dir: { x: 1, y: 0 } },
  { loc: { x: 0, y: 0 }, dir: { x: 0, y: 1 } },
  { loc: { x: width - 1, y: 0 }, dir: { x: -1, y: 0 } },
  { loc: { x: width - 1, y: 0 }, dir: { x: 0, y: 1 } },
  { loc: { x: width - 1, y: height - 1 }, dir: { x: -1, y: 0 } },
  { loc: { x: width - 1, y: height - 1 }, dir: { x: 0, y: -1 } },
  { loc: { x: 0, y: height - 1 }, dir: { x: 1, y: 0 } },
  { loc: { x: 0, y: height - 1 }, dir: { x: 0, y: -1 } },
  ...Array.from({ length: width - 2 }, (_, i) => ({
    loc: { x: i + 1, y: 0 },
    dir: { x: 0, y: 1 },
  })),
  ...Array.from({ length: width - 2 }, (_, i) => ({
    loc: { x: i + 1, y: height - 1 },
    dir: { x: 0, y: -1 },
  })),
  ...Array.from({ length: height - 2 }, (_, i) => ({
    loc: { x: 0, y: i + 1 },
    dir: { x: 1, y: 0 },
  })),
  ...Array.from({ length: height - 2 }, (_, i) => ({
    loc: { x: width - 1, y: i + 1 },
    dir: { x: -1, y: 0 },
  })),
];

const main = () => {
  const totals = startBeams.map(findEnergisedCells);
  console.log(totals);

  const maxIndex = totals.reduce(
    (maxIndex, total, index) => (total > totals[maxIndex] ? index : maxIndex),
    0
  );
  console.log(maxIndex, totals[maxIndex], startBeams[maxIndex]);
};

main();
