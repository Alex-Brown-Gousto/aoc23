const { hashString } = require("./lib");
const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8");

const hashes = input.split(",").map(hashString);

const sum = hashes.reduce((acc, hash) => acc + hash, 0);

console.log(sum);
