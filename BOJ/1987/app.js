const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [r, c] = input[0].split(' ').map(Number);
const board = input.slice(1).map((line) => line.split(''));
const visited = new Array(26).fill(0);
visited[board[0][0].charCodeAt() - 65] = 1;

let answer = 0;
dfs(0, 0, 1);
console.log(answer);

function dfs(x, y, depth) {
  answer = Math.max(answer, depth);
  [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ].forEach(([dx, dy]) => {
    if (x + dx >= 0 && x + dx < r && y + dy >= 0 && y + dy < c) {
      const idx = board[x + dx][y + dy].charCodeAt() - 65;
      if (!visited[idx]) {
        visited[idx] = 1;
        dfs(x + dx, y + dy, depth + 1);
        visited[idx] = 0;
      }
    }
  });
}
