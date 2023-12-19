const fs = require("fs");

const cardValueMap = new Map([
  ["A", 14],
  ["K", 13],
  ["Q", 12],
  ["T", 10],
  ["J", 1],
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

  let jokerCount = 0;
  if (handCounts.has(1)) {
    // there are jokers
    jokerCount = handCounts.get(1);
    handCounts.delete(1);

    // a hand with 5 jokers is a 5 of a kind
    if (jokerCount === 5) {
      return 7;
    }
  }

  const counts = Array.from(handCounts.values()).sort((a, b) => b - a);

  const maxCount = counts[0] + jokerCount;
  if (maxCount >= 4) {
    return maxCount + 2;
  } else if (maxCount === 3) {
    if (counts[1] === 2) {
      return maxCount + 2;
    } else {
      return maxCount + 1;
    }
  } else if (maxCount === 2) {
    if (counts[1] === 2) {
      return maxCount + 1;
    } else {
      return maxCount;
    }
  } else {
    return maxCount;
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
