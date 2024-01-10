const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [m, n, h] = input[0].split(' ').map(Number);
const tomatoes = new Array(h)
  .fill(0)
  .map(() => new Array(n).fill(0).map(() => new Array(m).fill(0)));
const inputArr = input.slice(1);

const starts = [];

for (let i = 0; i < h; i++) {
  const lines = [];
  for (let j = 0; j < n; j++) {
    const line = inputArr[i * n + j].split(' ').map(Number);
    for (let k = 0; k < m; k++) {
      if (line[k] === 1) {
        starts.push([k, j, h - i - 1]);
      }
    }
    lines.push(line);
  }
  tomatoes[h - i - 1] = lines;
}

const visited = new Array(h)
  .fill(0)
  .map(() => new Array(n).fill(0).map(() => new Array(m).fill(0)));

const bfs = (starts) => {
  const queue = [];

  starts.forEach((start) => {
    const [x, y, z] = start;
    visited[z][y][x] = 1;
    queue.push(start);
  });

  const d = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1],
  ];

  let top = 0;
  while (top < queue.length) {
    const [x, y, z] = queue[top];
    top += 1;

    d.forEach((item) => {
      const [dx, dy, dz] = item;
      if (
        x + dx >= 0 &&
        x + dx < m &&
        y + dy >= 0 &&
        y + dy < n &&
        z + dz >= 0 &&
        z + dz < h &&
        !tomatoes[z + dz][y + dy][x + dx]
      ) {
        if (!visited[z + dz][y + dy][x + dx]) {
          visited[z + dz][y + dy][x + dx] = visited[z][y][x] + 1;
          queue.push([x + dx, y + dy, z + dz]);
        }
      }
    });

    if (top === queue.length) {
      return visited[z][y][x] - 1;
    }
  }
};

const checkIsRipe = () => {
  for (const i in visited) {
    for (const j in visited[i]) {
      for (const k in visited[i][j]) {
        if (!visited[i][j][k] && tomatoes[i][j][k] !== -1) {
          return false;
        }
      }
    }
  }
  return true;
};

const answer = bfs(starts);
checkIsRipe() ? console.log(answer) : console.log(-1);
