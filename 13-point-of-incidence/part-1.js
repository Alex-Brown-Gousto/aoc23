const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const { parseMap, findReflection } = require("./lib");

const maps = input.split("\n\n");

console.log(maps[0]);

function getMapValue(map) {
  const rowReflection = findReflection(map.rows);
  if (typeof rowReflection !== "undefined") {
    return (rowReflection + 1) * 100;
  }

  const columnReflection = findReflection(map.columns);

  return columnReflection + 1;
}

const values = maps.map((map) => getMapValue(parseMap(map)));
console.log(values);

const sum = values.reduce((acc, value) => acc + value, 0);
console.log(sum);
