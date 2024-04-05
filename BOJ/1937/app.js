const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const forest = input.slice(1).map((line) => line.split(' ').map(Number));

const memo = new Array(n).fill(0).map(() => new Array(n).fill(0));
let answer = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!memo[i][j]) {
      dfs(i, j);
    }
    answer = Math.max(memo[i][j], answer);
  }
}
console.log(answer);

function dfs(x, y) {
  memo[x][y] = 1;
  [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ].forEach(([dx, dy]) => {
    if (x + dx >= 0 && x + dx < n && y + dy >= 0 && y + dy < n) {
      if (forest[x][y] < forest[x + dx][y + dy]) {
        if (!memo[x + dx][y + dy]) {
          memo[x][y] = Math.max(memo[x][y], dfs(x + dx, y + dy) + 1);
        } else {
          memo[x][y] = Math.max(memo[x][y], memo[x + dx][y + dy] + 1);
        }
      }
    }
  });

  return memo[x][y];
}
