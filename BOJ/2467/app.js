const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const n = +input[0];
const items = input[1].split(" ").map(Number);

// 0에 가까운 용액을 만들어내는 두 용액을 찾아라
let left = 0;
let right = n - 1;

let answerL = 0;
let answerR = Infinity;
let answer = Infinity;

while (left < right) {
  const sum = items[left] + items[right];
  const result = Math.abs(sum);

  if (result < answer) {
    answer = result;
    answerL = items[left];
    answerR = items[right];
  }

  sum < 0 ? left++ : right--;
}

console.log(answerL, answerR);
