const hashString = (string) =>
  string
    .split("")
    .reduce((acc, char) => ((acc + char.charCodeAt(0)) * 17) % 256, 0);

const removeLensStepRegex = /^([a-z]+)-/;
const addLensStepRegex = /^([a-z]+)=([0-9])/;

const parseStep = (step) => {
  const removeMatch = step.match(removeLensStepRegex);
  if (removeMatch) {
    return { type: "remove", label: removeMatch[1], step };
  }

  const addMatch = step.match(addLensStepRegex);
  if (addMatch) {
    return {
      type: "add",
      label: addMatch[1],
      focalLength: Number(addMatch[2]),
      step,
    };
  }

  throw new Error(`Invalid step: ${step}`);
};

const hashLabel = ({ label, ...rest }) => ({
  label,
  hash: hashString(label),
  ...rest,
});

module.exports = { hashString, parseStep, hashLabel };
