const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");

// 심사대 n개, 사람 m명
const [n, m] = input[0].split(" ").map(BigInt);
const times = input.slice(1).map(BigInt);
times.sort((a, b) => (a < b ? -1 : 1));

// 심사를 마치는 데 걸리는 시간의 최솟값
const result = Number(findMinTime());
console.log(result);

function findMinTime() {
  let left = BigInt(0);
  let mid = BigInt(0);
  let right = m * times[0];

  while (left <= right) {
    mid = (left + right) / BigInt(2);

    if (left === right) return mid;
    if (checkCanDone(mid)) {
      right = mid;
    } else {
      left = mid + BigInt(1);
    }
  }

  return mid;
}

function checkCanDone(time) {
  let count = BigInt(0);
  for (const t of times) {
    count += time / t;
    if (count >= m) return true;
  }

  return false;
}
