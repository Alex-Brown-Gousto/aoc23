const parseInput = (input) => {
  const cells = input.split("\n").map((row) => row.split(""));
  const galaxies = cells
    .flatMap((row, y) => row.map((cell, x) => cell === "#" && [x, y]))
    .filter(Boolean);

  return { galaxies, width: cells[0].length, height: cells.length };
};

const findBlankColumns = (sky) =>
  Array.from({ length: sky.width }, (_, x) => {
    return sky.galaxies.some(([galaxyX]) => galaxyX === x) ? undefined : x;
  }).filter((x) => typeof x !== "undefined");

const findBlankRows = (sky) =>
  Array.from({ length: sky.height }, (_, y) => {
    return sky.galaxies.some(([, galaxyY]) => galaxyY === y) ? undefined : y;
  }).filter((y) => typeof y !== "undefined");

const expandUniverse = (sky, n = 2) => {
  const blankColumns = findBlankColumns(sky);
  const blankRows = findBlankRows(sky);

  const expandedGalaxies = sky.galaxies.map(([x, y]) => [
    x + blankColumns.filter((column) => column < x).length * (n - 1),
    y + blankRows.filter((row) => row < y).length * (n - 1),
  ]);

  return {
    galaxies: expandedGalaxies,
    width: sky.width + blankColumns.length * (n - 1),
    height: sky.height + blankRows.length * (n - 1),
  };
};

const printSky = (sky) => {
  const cells = Array.from({ length: sky.height }, () =>
    Array.from({ length: sky.width }, () => ".")
  );

  sky.galaxies.forEach(([x, y]) => {
    cells[y][x] = "#";
  });

  return cells.map((row) => row.join("")).join("\n");
};

const getDistance = ([x1, y1], [x2, y2]) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);

module.exports = {
  parseInput,
  findBlankColumns,
  findBlankRows,
  printSky,
  expandUniverse,
  getDistance,
};
