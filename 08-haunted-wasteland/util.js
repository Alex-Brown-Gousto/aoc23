const parseSteps = (input) => {
  return input
    .match(/[LR]+/)[0]
    .split("")
    .map((step) => (step === "L" ? "left" : "right"));
};

const parseInput = (input) => ({
  steps: parseSteps(input),
  nodes: new Map(
    input
      .split("\n")
      .slice(2)
      .filter((line) => line !== "")
      .map((line) => {
        const match = line.match(/([A-Z0-9]+) = \(([A-Z0-9]+), ([A-Z0-9]+)\)/);

        return [match[1], { left: match[2], right: match[3] }];
      })
  ),
});

const takeStep = (steps, nodes, currentNode, currentStep) => {
  const nextDirection = steps[currentStep % steps.length];
  const nextNode = nodes.get(currentNode)[nextDirection];
  return nextNode;
};

module.exports = { parseInput, takeStep };
