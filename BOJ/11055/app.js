const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const numbers = input[1].split(' ').map(Number);
const memo = new Array(n).fill(0).map((_, i) => numbers[i]);

for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    if (numbers[i] < numbers[j]) {
      memo[j] = Math.max(memo[j], memo[i] + numbers[j]);
    }
  }
}

console.log(Math.max(...memo));
