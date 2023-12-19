const fs = require("fs");
const { parseInput, takeStep } = require("./util");

const input = fs.readFileSync("./input.txt", "utf-8");

const { steps, nodes } = parseInput(input);

let startNodes = Array.from(nodes.keys()).filter((key) => key.endsWith("A"));

const findCycle = (startNode) => {
  let currentStep = 0;
  let visitedNodes = new Map([]);

  let currentNode = startNode;

  const endNodes = [];

  while (!visitedNodes.has(`${currentStep % steps.length}-${currentNode}`)) {
    visitedNodes.set(
      `${currentStep % steps.length}-${currentNode}`,
      currentStep
    );
    currentNode = takeStep(steps, nodes, currentNode, currentStep);
    currentStep++;

    if (currentNode.endsWith("Z")) {
      endNodes.push({ currentStep, currentNode });
    }
  }

  return {
    currentStep,
    cycleStart: visitedNodes.get(
      `${currentStep % steps.length}-${currentNode}`
    ),
    endNodes,
  };
};

for (let i = 0; i < startNodes.length; i++) {
  const { currentStep, cycleStart, endNodes } = findCycle(startNodes[i]);
  console.log(currentStep, cycleStart, endNodes);
}

const cycleLengths = startNodes.map((startNode) => {
  const { endNodes } = findCycle(startNode);
  return endNodes[0].currentStep;
});

const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a / gcd(a, b)) * b;
const lcmAll = (ns) => ns.reduce(lcm, 1);

console.log(lcmAll(cycleLengths));
