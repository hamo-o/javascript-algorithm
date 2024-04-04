const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [m, n] = input[0].split(' ').map(Number);
const map = input.slice(1).map((line) => line.split(' ').map(Number));

const count = new Array(m).fill(0).map(() => new Array(n).fill(-1));

// count[a][b] = c
// (a, b)에서는 (n-1, m-1)까지 c개의 경로로 도달할 수 있다.

dfs(0, 0);
console.log(count[0][0]);

function dfs(x, y) {
  if (x === m - 1 && y === n - 1) return 1;
  if (count[x][y] === -1) count[x][y] = 0;
  [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ].forEach(([dx, dy]) => {
    if (x + dx >= 0 && x + dx < m && y + dy >= 0 && y + dy < n) {
      if (map[x][y] > map[x + dx][y + dy]) {
        if (count[x + dx][y + dy] === -1) {
          count[x][y] += dfs(x + dx, y + dy);
        } else {
          count[x][y] += count[x + dx][y + dy];
        }
      }
    }
  });
  return count[x][y];
}
