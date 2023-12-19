const { findReflection } = require("./lib.js");

describe("findReflection", () => {
  it("should find the reflection", () => {
    const input = [12, 34, 34, 12];
    expect(findReflection(input)).toEqual(1);
  });
  it("should not find the reflection", () => {
    const input = [12, 34, 34, 45, 12];
    expect(findReflection(input)).toBeUndefined();
  });
});
