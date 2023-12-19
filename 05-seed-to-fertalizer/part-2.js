const fs = require("fs");
const { parseSeedMap, useMapping } = require("./lib");

const input = fs.readFileSync("input.txt", "utf-8");

const results = parseSeedMap(input);

const mapInput = (inputCategory, value) => {
  const { mappings } = results;
  let fromCategory, toCategory;
  fromCategory = inputCategory;

  while (mappings.find((mapping) => mapping.from === fromCategory)) {
    toCategory = mappings.find((mapping) => mapping.from === fromCategory).to;
    value = useMapping(mappings, fromCategory, toCategory, value);
    fromCategory = toCategory;
  }

  return value;
};

// brute force - sorry in advance to your CPU :)

let minSeedInput, minSeedOutput;
for (let i = 0; i < results.seeds.length; i += 2) {
  console.log(i, results.seeds.length);
  const start = results.seeds[i];
  const range = results.seeds[i + 1];

  for (let j = start; j < start + range; j++) {
    let output = mapInput("seed", j);
    if (!minSeedOutput || output < minSeedOutput) {
      minSeedOutput = output;
      minSeedInput = j;
      console.log(minSeedInput, minSeedOutput);
    }
  }
}

console.log(minSeedInput, minSeedOutput);
