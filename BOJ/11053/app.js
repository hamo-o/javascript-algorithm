const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const numbers = input[1].split(' ').map(Number);
const memo = new Array(n).fill(1);

for (let i = 0; i < n - 1; i++) {
  const start = numbers[i];
  for (let j = i + 1; j < n; j++) {
    if (start < numbers[j]) {
      memo[j] = Math.max(memo[j], memo[i] + 1);
    }
  }
}

console.log(Math.max(...memo));
