const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const numbers = input[1].split(' ').map(Number);
const memo_asc = new Array(n).fill(1);
const memo_desc = new Array(n).fill(1);

for (let i = 0; i < n; i++) {
  const pivot = numbers[i];
  for (let j = i + 1; j < n; j++) {
    if (pivot < numbers[j]) {
      memo_asc[j] = Math.max(memo_asc[j], memo_asc[i] + 1);
    }
  }
}

for (let i = n - 1; i >= 0; i--) {
  const pivot = numbers[i];
  for (let j = 0; j < i; j++) {
    if (pivot < numbers[j]) {
      memo_desc[j] = Math.max(memo_desc[j], memo_desc[i] + 1);
    }
  }
}

let answer = 0;
for (let i = 0; i < n; i++) {
  answer = Math.max(answer, memo_asc[i] + memo_desc[i] - 1);
}

console.log(answer);
