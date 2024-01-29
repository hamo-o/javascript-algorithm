const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [a, b] = input.map((item) => item.split(''));
// 문자열길이 1000 이하
const a_len = a.length;
const b_len = b.length;

const memo = new Array(a_len + 1)
  .fill(0)
  .map(() => new Array(b_len + 1).fill(0));

for (let i = 1; i <= a_len; i++) {
  for (let j = 1; j <= b_len; j++) {
    if (a[i - 1] === b[j - 1]) {
      memo[i][j] = memo[i - 1][j - 1] + 1;
    } else {
      memo[i][j] = Math.max(memo[i - 1][j], memo[i][j - 1]);
    }
  }
}

console.log(memo[a_len][b_len]);
