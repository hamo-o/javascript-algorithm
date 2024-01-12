const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = +fs.readFileSync(filePath).toString().trim();

const memo = new Array(50001).fill(0);

for (let i = 1; i <= 50000; i++) {
  memo[i] = i;
  for (let j = 1; j * j <= i; j++) {
    memo[i] = Math.min(memo[i], memo[i - j * j] + 1);
  }
}

console.log(memo[input]);
