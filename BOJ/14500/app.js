const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const blocks = input.slice(1).map((line) => line.split(' ').map(Number));
const visited = new Array(n).fill(0).map(() => new Array(m).fill(0));

const dfs = (x, y, sum, depth) => {
  if (depth === 4) {
    return sum;
  }

  let max = 0;
  [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ].forEach((item) => {
    const [dx, dy] = item;
    if (
      x + dx < n &&
      x + dx >= 0 &&
      y + dy < m &&
      y + dy >= 0 &&
      !visited[x + dx][y + dy]
    ) {
      sum += blocks[x + dx][y + dy];
      visited[x + dx][y + dy] = 1;

      max = Math.max(max, dfs(x + dx, y + dy, sum, depth + 1));

      sum -= blocks[x + dx][y + dy];
      visited[x + dx][y + dy] = 0;
    }
  });

  return max;
};

const extra = (x, y, sum, depth) => {
  if (depth === 4) {
    return sum;
  }

  let max = 0;
  [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ].forEach((item) => {
    const [dx, dy] = item;
    if (
      x + dx < n &&
      x + dx >= 0 &&
      y + dy < m &&
      y + dy >= 0 &&
      !visited[x + dx][y + dy]
    ) {
      sum += blocks[x + dx][y + dy];
      visited[x + dx][y + dy] = 1;

      max = Math.max(max, extra(x, y, sum, depth + 1));

      sum -= blocks[x + dx][y + dy];
      visited[x + dx][y + dy] = 0;
    }
  });

  return max;
};

let answer = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    visited[i][j] = 1;
    answer = Math.max(
      answer,
      dfs(i, j, blocks[i][j], 1),
      extra(i, j, blocks[i][j], 1)
    );
    visited[i][j] = 0;
  }
}
console.log(answer);
