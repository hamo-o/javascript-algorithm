const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const numbers = input.slice(1).map((line) => line.split(' ').map(Number));
const memo = new Array(n).fill(0).map(() => []);

memo[0] = [numbers[0][0]];
for (let i = 1; i < n; i++) {
  for (let j = 0; j < i + 1; j++) {
    if (j - 1 >= 0 && j < i) {
      memo[i].push(
        Math.max(
          memo[i - 1][j - 1] + numbers[i][j],
          memo[i - 1][j] + numbers[i][j]
        )
      );
    } else if (j - 1 >= 0) {
      memo[i].push(memo[i - 1][j - 1] + numbers[i][j]);
    } else if (j < i) {
      memo[i].push(memo[i - 1][j] + numbers[i][j]);
    }
  }
}

const answer = Math.max(...memo[n - 1]);
console.log(answer);
