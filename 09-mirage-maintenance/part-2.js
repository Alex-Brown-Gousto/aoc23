const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8");

const sequences = input
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => line.split(" ").map((num) => parseInt(num, 10)));

const getDiffSequence = (sequence) =>
  sequence.slice(1).map((num, i) => num - sequence[i]);

const isSequenceZeroes = (sequence) => sequence.every((num) => num === 0);

const getAllDiffs = (sequence) => {
  let diffs = [sequence];
  let diffSequence = getDiffSequence(sequence);

  while (!isSequenceZeroes(diffSequence)) {
    diffs.push(diffSequence);
    diffSequence = getDiffSequence(diffSequence);
  }

  diffs.push(diffSequence);

  return diffs;
};

const diffs = sequences.map(getAllDiffs);

const getPrevNumber = (diffs) => {
  let prevValues = [0];

  for (let i = diffs.length - 2; i >= 0; i--) {
    const diffSequence = diffs[i];
    prevValues.push(diffSequence[0] - prevValues[prevValues.length - 1]);
  }

  return prevValues[prevValues.length - 1];
};

const prevNumbers = diffs.map(getPrevNumber);

const sum = prevNumbers.reduce((acc, num) => acc + num, 0);

console.log(sum);
