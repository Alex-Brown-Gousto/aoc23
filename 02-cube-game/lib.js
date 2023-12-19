const parseRound = (roundInput) => {
  const cubeInputs = roundInput.split(",").map((cubeInput) => cubeInput.trim());
  const cubes = cubeInputs.map((cubeInput) => {
    const [number, color] = cubeInput.split(" ");
    return { color, number: parseInt(number) };
  });
  return { cubes };
};

const parseGame = (input) => {
  const [gameInput, roundsInput] = input.split(":");

  const gameNumber = parseInt(gameInput.split(" ")[1]);

  const rounds = roundsInput
    .split(";")
    .map((round) => parseRound(round.trim()));

  return { gameNumber, rounds };
};

module.exports = { parseGame };
