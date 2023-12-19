const { parseStep, hashLabel } = require("./lib");
const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8");

const steps = input.split(",").map(parseStep).map(hashLabel);

const performStep = (state, step) => {
  let box = state.get(step.hash);
  if (!box) {
    box = [];
    state.set(step.hash, box);
  }

  if (step.type === "remove") {
    const newBox = box.filter(({ label }) => label !== step.label);
    if (newBox.length === 0) {
      state.delete(step.hash);
    } else {
      state.set(step.hash, newBox);
    }
  }

  if (step.type === "add") {
    const replaceIndex = box.findIndex(({ label }) => label === step.label);
    if (replaceIndex > -1) {
      box[replaceIndex] = { label: step.label, focalLength: step.focalLength };
    } else {
      box.push({ label: step.label, focalLength: step.focalLength });
    }
  }

  return state;
};

const printState = (state) => {
  for (let [boxNumber, box] of state) {
    console.log(
      `Box ${boxNumber}:`,
      box.map(({ label, focalLength }) => `[${label} ${focalLength}]`).join(" ")
    );
  }
};

let state = new Map();
const print = true;
for (let step of steps) {
  if (print) {
    console.log("After:", step.step);
  }
  performStep(state, step);
  if (print) {
    printState(state);
    console.log();
  }
}

const focusingPower = Array.from(state.entries()).reduce(
  (acc, [boxNumber, box]) => {
    return (
      acc +
      (boxNumber + 1) *
        box.reduce(
          (acc, { focalLength }, slotIndex) =>
            acc + focalLength * (slotIndex + 1),
          0
        )
    );
  },
  0
);

console.log(focusingPower);
