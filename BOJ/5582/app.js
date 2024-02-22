const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [a, b] = input;
const memo = new Array(a.length + 1)
  .fill(0)
  .map(() => new Array(b.length + 1).fill(0));

let answer = 0;
for (let i = 1; i <= a.length; i++) {
  for (let j = 1; j <= b.length; j++) {
    if (a[i - 1] === b[j - 1]) {
      memo[i][j] = memo[i - 1][j - 1] + 1;
      answer = Math.max(answer, memo[i][j]);
    }
  }
}

console.log(answer);
