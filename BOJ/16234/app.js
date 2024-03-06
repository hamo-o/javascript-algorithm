const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, L, R] = input[0].split(' ').map(Number);
const grid = input.slice(1).map((line) => line.split(' ').map(Number));

let count = 0;
let flag = true;
while (flag) {
  flag = false;
  const visited = new Array(N).fill(0).map(() => new Array(N).fill(0));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        const result = bfs([i, j], visited);
        if (result) flag = true;
      }
    }
  }
  count += flag;
}
console.log(count);

function bfs(start, visited) {
  const queue = [];
  let sum = 0;

  const [sx, sy] = start;
  visited[sx][sy] = 1;
  sum += grid[sx][sy];
  queue.push(start);

  let front = 0;

  while (front < queue.length) {
    const [x, y] = queue[front];
    front++;
    [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ].forEach(([dx, dy]) => {
      if (
        x + dx >= 0 &&
        x + dx < N &&
        y + dy >= 0 &&
        y + dy < N &&
        !visited[x + dx][y + dy]
      ) {
        const gap = Math.abs(grid[x][y] - grid[x + dx][y + dy]);
        if (L <= gap && gap <= R) {
          visited[x + dx][y + dy] = 1;
          sum += grid[x + dx][y + dy];
          queue.push([x + dx, y + dy]);
        }
      }
    });
  }

  const size = queue.length;
  const value = Math.floor(sum / size);
  queue.forEach(([x, y]) => {
    grid[x][y] = value;
  });

  return size === 1 ? 0 : 1;
}
