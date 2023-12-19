const fs = require("fs");
const { parseMapToArrays, findReflectionWithSmudge } = require("./lib");

const input = fs.readFileSync("./input.txt", "utf-8");

const maps = input.split("\n\n").map((map) => parseMapToArrays(map));

console.log(maps[0]);

function getMapValue(map) {
  const rowReflection = findReflectionWithSmudge(map.rows);
  if (typeof rowReflection !== "undefined") {
    return (rowReflection + 1) * 100;
  }

  const columnReflection = findReflectionWithSmudge(map.columns);

  return columnReflection + 1;
}

const values = maps.map((map) => getMapValue(map));
console.log(values);

const sum = values.reduce((acc, value) => acc + value, 0);
console.log(sum);
