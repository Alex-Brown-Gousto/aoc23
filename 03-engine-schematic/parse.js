const parseSchematic = (input) => {
  const lines = input.split("\n");
  const numbers = [];
  const symbols = [];

  let inNumber = false;

  const finishNumber = () => {
    if (!inNumber) return;
    inNumber = false;
    const lastNumber = numbers[numbers.length - 1];
    lastNumber.value = parseInt(lastNumber.digits.join(""));
    lastNumber.length = lastNumber.digits.length;
    delete lastNumber.digits;
  };

  const addToNumber = (digit, i, j) => {
    if (!inNumber) {
      numbers.push({ digits: [digit], i, j });
      inNumber = true;
    } else {
      const lastNumber = numbers[numbers.length - 1];
      lastNumber.digits.push(digit);
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      const cell = line[j];
      if (cell === ".") {
        finishNumber();
      } else if (cell.match(/\d/)) {
        addToNumber(cell, i, j);
      } else {
        finishNumber();
        symbols.push({ symbol: cell, i, j });
      }
    }

    finishNumber();
  }

  return { numbers, symbols };
};

module.exports = { parseSchematic };
