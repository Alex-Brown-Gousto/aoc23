const mappingRegex = /([a-z]+)-to-([a-z]+) map:\n(\d+\s*)*/g;

const parseMapping = (input) => {
  const lines = input.split("\n");
  const map = lines
    .slice(1)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.split(" "))
    .map(([destStart, sourceStart, range]) => ({
      destStart: Number(destStart),
      sourceStart: Number(sourceStart),
      range: Number(range),
    }));

  return map;
};

const parseSeedMap = (input) => {
  const seedInput = input.split("\n")[0];
  const seeds = seedInput.split(":")[1].trim().split(" ").map(Number);
  const mappings = [];

  let mappingInput;
  while ((mappingInput = mappingRegex.exec(input))) {
    mappings.push({
      from: mappingInput[1],
      to: mappingInput[2],
      map: parseMapping(mappingInput[0]),
    });
  }

  return { seeds, mappings };
};

const useMapping = (mappings, fromCategory, toCategory, fromValue) => {
  const mapping = mappings.find(
    (mapping) => mapping.from === fromCategory && mapping.to === toCategory
  );

  if (!mapping) {
    throw new Error(`No mapping found from ${fromCategory} to ${toCategory}`);
  }

  const { map } = mapping;

  const mappingForValue = map.find(
    (mapping) =>
      mapping.sourceStart <= fromValue &&
      fromValue < mapping.sourceStart + mapping.range
  );

  if (!mappingForValue) {
    return fromValue;
  } else {
    const { destStart, sourceStart } = mappingForValue;
    const offset = fromValue - sourceStart;
    return destStart + offset;
  }
};

module.exports = { parseSeedMap, useMapping };
