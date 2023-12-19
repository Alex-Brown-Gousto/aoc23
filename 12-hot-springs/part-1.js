const fs = require("fs");
const { findGroupPositions } = require("./lib");

function findArrangements(input, groups, log = false) {
  let results = [{ state: input.split(""), startIndex: 0 }];
  for (let i = 0; i < groups.length; i++) {
    results = results.flatMap((result) => {
      return findGroupPositions(
        result.state,
        groups[i],
        result.startIndex,
        i === groups.length - 1
      );
    });

    if (log) {
      console.log(
        results.map(({ state, startIndex }) => ({
          state: state.join(""),
          startIndex,
        }))
      );
    }
  }

  if (log) {
    console.log(results.length);
  }

  return results;
}

const input = fs.readFileSync("input.txt").toString().trim();

const records = input
  .split("\n")
  .map((x) => x.split(" "))
  .map(([input, rawGroups]) => ({
    input,
    groups: rawGroups.split(",").map((x) => parseInt(x)),
  }));

const arrangements = records.map(({ input, groups }) =>
  findArrangements(input, groups)
);

console.log(arrangements.map((x) => x.length));

const sum = arrangements.reduce((acc, x) => acc + x.length, 0);

console.log(sum);
