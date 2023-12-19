const fs = require("fs");
const { findGroupPositions } = require("./lib");

function findArrangements(input, groups, log = false) {
  let splitInput = input.split("");
  let startPositions = new Map([[0, 1]]);
  for (let i = 0; i < groups.length; i++) {
    let newStartPositions = new Map();

    for (let [startIndex, count] of startPositions) {
      let arrangements = findGroupPositions(
        splitInput,
        groups[i],
        startIndex,
        i === groups.length - 1
      );

      // console.log(
      //   startIndex,
      //   count,
      //   arrangements.map(({ state }) => state.join(""))
      // );

      for (let { startIndex } of arrangements) {
        if (!newStartPositions.has(startIndex)) {
          newStartPositions.set(startIndex, 0);
        }
        newStartPositions.set(
          startIndex,
          newStartPositions.get(startIndex) + count
        );
      }
    }

    startPositions = newStartPositions;
    if (log) {
      console.log(startPositions);
    }
  }

  const sum = Array.from(startPositions.values()).reduce(
    (acc, x) => acc + x,
    0
  );

  return sum;
}

const input = fs.readFileSync("input.txt").toString().trim();

const unfold = (input, groups, repeat = 5) => {
  return {
    input: Array.from({ length: repeat }, () => input).join("?"),
    groups: new Array(repeat).fill(groups).flat(),
  };
};

const records = input
  .split("\n")
  .map((x) => x.split(" "))
  .map(([input, rawGroups]) => {
    const groups = rawGroups.split(",").map((x) => parseInt(x));
    return unfold(input, groups);
  });

// const inspectRow = 0;
// console.log(records[inspectRow].input, records[inspectRow].groups);
// findArrangements(records[inspectRow].input, records[inspectRow].groups, true);

const arrangements = records.map(({ input, groups }, i) => {
  console.log(i, records.length);
  return findArrangements(input, groups);
});

console.log(arrangements);

const sum = arrangements.reduce((acc, x) => acc + x, 0);

console.log(sum);
