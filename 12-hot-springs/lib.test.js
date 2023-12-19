const { findGroupPositions } = require("./lib");

const testFindGroupPositions = (input, groupLength, isLastGroup, expected) => {
  let results = findGroupPositions(
    input.split(""),
    groupLength,
    0,
    isLastGroup
  ).map(({ state, startIndex }) => ({ state: state.join(""), startIndex }));

  expect(results).toEqual(expected);
};

describe("findGroupPositions", () => {
  it('finds all positions in a string of "?"s', () => {
    testFindGroupPositions("??????", 3, false, [
      { state: "###.??", startIndex: 4 },
      { state: ".###.?", startIndex: 5 },
      // { state: "..###.", startIndex: 6 },
      // { state: "...###", startIndex: 7 },
    ]);
  });

  it('finds all positions in a string of "?"s pinned with "."s', () => {
    testFindGroupPositions("?..???", 3, true, [
      { state: "...###", startIndex: 7 },
    ]);
  });

  it("finds an already existing group", () => {
    testFindGroupPositions("??###???", 3, false, [
      { state: "..###.??", startIndex: 6 },
    ]);
  });

  it("finds all positions that would allow an extra group if it is not the last group", () => {
    testFindGroupPositions("??#???", 3, false, [
      { state: "###.??", startIndex: 4 },
      { state: ".###.?", startIndex: 5 },
      // { state: "..###.", startIndex: 6 },
    ]);
  });

  it('finds all positions in a string of "?"s pinned with "#"s', () => {
    testFindGroupPositions("??#???", 3, true, [
      { state: "###.??", startIndex: 4 },
      { state: ".###.?", startIndex: 5 },
      { state: "..###.", startIndex: 6 },
    ]);
  });
});
