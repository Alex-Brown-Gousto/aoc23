const fs = require("fs");

const cardValueMap = new Map([
  ["A", 14],
  ["K", 13],
  ["Q", 12],
  ["J", 11],
  ["T", 10],
]);

const handStrengthMap = new Map([
  [1, "High Card"],
  [2, "One Pair"],
  [3, "Two Pair"],
  [4, "Three of a Kind"],
  [5, "Full House"],
  [6, "Four of a Kind"],
  [7, "Five of a Kind"],
]);

const convertCardToValue = (card) =>
  cardValueMap.get(card) || parseInt(card, 10);

const getHandStrength = (hand) => {
  const handCounts = new Map();
  if (typeof hand === "string") hand = hand.split("");
  for (let card of hand) {
    const value = convertCardToValue(card);
    const count = handCounts.get(value) || 0;
    handCounts.set(value, count + 1);
  }

  const counts = Array.from(handCounts.values()).sort((a, b) => b - a);
  if (counts[0] >= 4) {
    return counts[0] + 2;
  } else if (counts[0] === 3) {
    if (counts[1] === 2) {
      return counts[0] + 2;
    } else {
      return counts[0] + 1;
    }
  } else if (counts[0] === 2) {
    if (counts[1] === 2) {
      return counts[0] + 1;
    } else {
      return counts[0];
    }
  } else {
    return counts[0];
  }
};

const getCombinedHandStrength = (hand) => {
  let cardValue = hand
    .split("")
    .map(convertCardToValue)
    .reduce((acc, cur, i) => acc + cur * Math.pow(16, 4 - i), 0);

  cardValue = cardValue + getHandStrength(hand) * Math.pow(16, 5);

  return cardValue;
};

const getHand = (hand) => handStrengthMap.get(getHandStrength(hand));

const input = fs.readFileSync("./input.txt", "utf-8");

const hands = input
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => line.split(" "))
  .map(([hand, bid]) => ({
    hand,
    bid: Number(bid),
    strength: getCombinedHandStrength(hand),
  }));

const sortedHands = hands.sort((a, b) => a.strength - b.strength);

const score = sortedHands.reduce((acc, cur, i) => acc + cur.bid * (i + 1), 0);

console.log(score);
