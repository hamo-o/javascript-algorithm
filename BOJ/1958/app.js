const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [a, b, c] = input;

const memo = new Array(a.length + 1)
  .fill(0)
  .map(() =>
    new Array(b.length + 1).fill(0).map(() => new Array(c.length + 1).fill(0))
  );

for (let i = 1; i <= a.length; i++) {
  for (let j = 1; j <= b.length; j++) {
    for (let k = 1; k <= c.length; k++) {
      if (a[i - 1] === b[j - 1] && b[j - 1] === c[k - 1]) {
        memo[i][j][k] = memo[i - 1][j - 1][k - 1] + 1;
      } else {
        memo[i][j][k] = Math.max(
          memo[i - 1][j][k],
          memo[i][j - 1][k],
          memo[i][j][k - 1]
        );
      }
    }
  }
}

console.log(memo[a.length][b.length][c.length]);
