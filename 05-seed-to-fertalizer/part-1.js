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
    console.log(`${fromCategory} -> ${toCategory}: ${value}`);
    fromCategory = toCategory;
  }

  return value;
};

const seedOutput = results.seeds.map((seed) => mapInput("seed", seed));

const minOutput = Math.min(...seedOutput);

console.log(minOutput);
