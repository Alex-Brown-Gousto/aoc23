/*

for a race of time t, and a charge time of x where x < t
the distance traveled is d = x * (t - x) = -x^2 + t * x

if the previous best is u, then for d to be better than u, d > u

-x^2 + t * x - u = 0
x = (t +- sqrt(t^2 - 4 * u)) / 2

*/

const distance = (t, x) => -x * x + t * x;

const getAcceptableChargeTime = (raceTime, previousBest) => {
  const t = raceTime;
  const u = previousBest;
  const dist = Math.sqrt(t * t - 4 * u);
  let x1 = (t - dist) / 2;
  let x2 = (t + dist) / 2;

  // if the solution is exact then we can't allow it as we must be
  // strictly better than the previous best
  if (Math.ceil(x1) === x1) {
    x1 += 1;
  }
  if (Math.floor(x2) === x2) {
    x2 -= 1;
  }

  return [Math.ceil(x1), Math.floor(x2)];
};

const getRange = ([x1, x2]) => x2 - x1 + 1;

// const testRaces = [
//   {
//     time: 7,
//     best: 9,
//   },
//   {
//     time: 15,
//     best: 40,
//   },
//   {
//     time: 30,
//     best: 200,
//   },
// ];

const races = [
  {
    time: 48,
    best: 261,
  },
  {
    time: 93,
    best: 1192,
  },
  {
    time: 84,
    best: 1019,
  },
  {
    time: 66,
    best: 1063,
  },
];

const ranges = races.map(({ time, best }) =>
  getRange(getAcceptableChargeTime(time, best))
);

console.log(ranges);

const prod = ranges.reduce((acc, cur) => acc * cur, 1);

console.log(prod);
