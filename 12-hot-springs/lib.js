const findGroupPositions = (
  input,
  groupLength,
  startIndex = 0,
  isLastGroup = false
) => {
  const candidates = [];
  const group = Array.from({ length: groupLength }, () => "#");
  const groupWithSeparator = group.concat(".");

  const addToCandidates = (state, startIndex) =>
    candidates.push({ state, startIndex });

  for (let i = startIndex; i <= input.length - groupLength; i++) {
    let char = input[i];

    if (char === "#" || char === "?") {
      if (
        Array.from({ length: groupLength }, (_, j) => i + j).every(
          (index) => input[index] === "?" || input[index] === "#"
        )
      ) {
        if (i + groupLength < input.length && input[i + groupLength] !== "#") {
          let remaining = input.slice(i + groupLength + 1);
          if (
            (isLastGroup && remaining.every((x) => x === "." || x === "?")) ||
            (!isLastGroup && remaining.some((x) => x === "?" || x === "#"))
          ) {
            addToCandidates(
              input
                .slice(0, i)
                .map((x) => (x === "?" ? "." : x))
                .concat(groupWithSeparator, input.slice(i + groupLength + 1)),
              i + groupLength + 1
            );
          }
        } else if (isLastGroup && i + groupLength == input.length) {
          addToCandidates(
            input
              .slice(0, i)
              .map((x) => (x === "?" ? "." : x))
              .concat(group),
            i + groupLength + 1
          );
        }
      }
    }
    if (char === "#") {
      return candidates;
    }
  }

  return candidates;
};

module.exports = { findGroupPositions };
