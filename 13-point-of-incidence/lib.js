function convertRowToNumber(row) {
  const rowAsBinary = row.replace(/\./g, "0").replace(/#/g, "1");
  return parseInt(rowAsBinary, 2);
}

function parseMap(input) {
  const rowsInput = input.split("\n");
  const columnsInput = Array.from({ length: rowsInput[0].length }, (_, i) =>
    rowsInput.map((row) => row[i]).join("")
  );
  const rows = rowsInput.map(convertRowToNumber);
  const columns = columnsInput.map(convertRowToNumber);
  return { rows, columns };
}

function parseMapToArrays(input) {
  const rowsInput = input.split("\n");
  const columnsInput = Array.from({ length: rowsInput[0].length }, (_, i) =>
    rowsInput.map((row) => row[i]).join("")
  );
  const rows = rowsInput.map((row) =>
    row.split("").map((char) => (char === "#" ? 1 : 0))
  );
  const columns = columnsInput.map((column) =>
    column.split("").map((char) => (char === "#" ? 1 : 0))
  );
  return { rows, columns };
}

function checkReflection(input, reflect) {
  let dist = 0;
  while (reflect - dist >= 0 && reflect + dist + 1 < input.length) {
    if (input[reflect - dist] !== input[reflect + dist + 1]) {
      return false;
    }
    dist++;
  }

  return true;
}

function findReflection(input) {
  for (let i = 0; i < input.length - 1; i++) {
    if (checkReflection(input, i)) {
      return i;
    }
  }
}

function findDistance(line1, line2) {
  return line1.reduce((acc, value, i) => acc + Math.abs(value - line2[i]), 0);
}

function checkReflectionWithSmudge(input, reflect) {
  let dist = 0;
  let smudgeCount = 0;
  while (reflect - dist >= 0 && reflect + dist + 1 < input.length) {
    const rowError = findDistance(
      input[reflect - dist],
      input[reflect + dist + 1]
    );
    if (rowError === 1) {
      smudgeCount++;
      if (smudgeCount > 1) {
        return false;
      }
    } else if (rowError > 1) {
      return false;
    }
    dist++;
  }

  return smudgeCount === 1;
}

function findReflectionWithSmudge(input) {
  for (let i = 0; i < input.length - 1; i++) {
    if (checkReflectionWithSmudge(input, i)) {
      return i;
    }
  }
}

module.exports = {
  parseMap,
  checkReflection,
  findReflection,
  parseMapToArrays,
  checkReflectionWithSmudge,
  findReflectionWithSmudge,
};
