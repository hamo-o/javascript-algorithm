const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = +input[0];
// 자연수 n을 연속된 소수의 합으로 나타낼 수 있는 경우의 수?

const arr = [];
for (let i = 2; i <= n; i++) {
  if (checkIsPrime(i)) arr.push(i);
}

function checkIsPrime(num) {
  for (let i = 2; i * i <= num; i++) {
    if (!(num % i)) return false;
  }
  return true;
}

let left = 0;
let right = 0;
let sum = arr[left];
let count = 0;

while (left <= right && right < arr.length) {
  if (sum < n) {
    right++;
    if (right < arr.length) {
      sum += arr[right];
    }
  } else if (sum > n) {
    sum -= arr[left];
    left++;
  } else {
    sum -= arr[left];
    left++;
    right++;
    if (right < arr.length) {
      sum += arr[right];
    }
    count++;
  }
}

console.log(count);
