const fs = require("fs");
const { parseInput, takeStep } = require("./util");

const input = fs.readFileSync("./input.txt", "utf-8");

const { steps, nodes } = parseInput(input);

let currentNode = "AAA",
  currentStep = 0;

while (currentNode !== "ZZZ") {
  currentNode = takeStep(steps, nodes, currentNode, currentStep);
  currentStep++;
  console.log(currentStep, currentNode);
}
