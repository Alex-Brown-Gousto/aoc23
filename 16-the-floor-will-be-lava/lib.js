const addComponent = (cell, x, y) => ({ type: cell, x, y });

const parse = (input) => ({
  width: input.split("\n")[0].length,
  height: input.split("\n").length,
  components: input
    .split("\n")
    .flatMap((row, y) =>
      row
        .split("")
        .map((cell, x) => (cell !== "." ? addComponent(cell, x, y) : null))
    )
    .filter(Boolean),
});

const addVectors = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });

const printDirection = (dir) => {
  if (dir.x === 1 && dir.y === 0) {
    return ">";
  }
  if (dir.x === -1 && dir.y === 0) {
    return "<";
  }
  if (dir.x === 0 && dir.y === 1) {
    return "v";
  }
  if (dir.x === 0 && dir.y === -1) {
    return "^";
  }
};

module.exports = { parse, addVectors, printDirection };
