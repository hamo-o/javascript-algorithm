const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [a, b] = input;
const memo = new Array(a.length + 1)
  .fill(0)
  .map(() => new Array(b.length + 1).fill(0));

for (let i = 1; i <= a.length; i++) {
  for (let j = 1; j <= b.length; j++) {
    if (a[i - 1] === b[j - 1]) {
      memo[i][j] = memo[i - 1][j - 1] + 1;
    } else {
      memo[i][j] = Math.max(memo[i][j - 1], memo[i - 1][j]);
    }
  }
}

const answer = [];
let i = a.length;
let j = b.length;
while (i > 0 && memo[i][j]) {
  while (j > 0) {
    if (memo[i][j] > memo[i][j - 1]) {
      if (a[i - 1] === b[j - 1]) {
        answer.push(a[i - 1]);
        j--;
      }
      break;
    }
    j--;
  }
  i--;
}

console.log(memo[a.length][b.length]);
console.log(answer.reverse().join(''));
