const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

const columns = new Array(input[0].length).fill("");

for (let i = input.length - 1; i >= 0; i--) {
  for (let j = 0; j < input[i].length; j++) {
    columns[j] += input[i][j];
  }
}

function tiltColumn(column) {
  return column
    .split("#")
    .map((section) => {
      if (section === "") return section;

      const stoneCount = section
        .split("")
        .filter((char) => char === "O").length;
      return (
        new Array(section.length - stoneCount).fill(".").join("") +
        new Array(stoneCount).fill("O").join("")
      );
    })
    .join("#");
}

function calculateColumnLoad(column) {
  return column.split("").reduce((acc, char, i) => {
    if (char === "O") {
      acc += i + 1;
    }
    return acc;
  }, 0);
}

const tiltedColumns = columns.map(tiltColumn);

const loads = tiltedColumns.map(calculateColumnLoad);

console.log(loads);

const sum = loads.reduce((acc, load) => acc + load, 0);

console.log(sum);
