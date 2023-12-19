const parseNumberList = (input) =>
  input
    .trim()
    .split(" ")
    .filter((n) => n.trim() !== "")
    .map((n) => parseInt(n.trim()));

const parseScratchcards = (input) => {
  return input.split("\n").map((line) => {
    const [nameInput, rest] = line.split(":");
    const [winningInput, cardInput] = rest.split("|");

    const cardNumber = parseInt(nameInput.split(" ")[1]);

    return {
      cardNumber,
      winningNumbers: parseNumberList(winningInput),
      cardNumbers: parseNumberList(cardInput),
    };
  });
};

module.exports = { parseScratchcards };
