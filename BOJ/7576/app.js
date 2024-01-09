const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [m, n] = input[0].split(' ').map(Number);
const tomatoes = input.slice(1).map((line) => line.split(' ').map(Number));

const visited = new Array(n).fill(0).map(() => new Array(m).fill(0));

const getStart = () => {
  const start = [];
  tomatoes.forEach((tomato, i) => {
    tomato.forEach((item, j) => {
      if (item === 1) {
        start.push([i, j]);
      }
    });
  });

  return start;
};

const bfs = (starts) => {
  const queue = [];

  starts.forEach((start) => {
    const [y, x] = start;
    visited[y][x] = 1;
    queue.push(start);
  });

  const d = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  let top = 0;
  while (top < queue.length) {
    const [y, x] = queue[top];
    top += 1;

    d.forEach((item) => {
      const [dx, dy] = item;
      if (
        x + dx >= 0 &&
        x + dx < m &&
        y + dy >= 0 &&
        y + dy < n &&
        !tomatoes[y + dy][x + dx]
      ) {
        if (!visited[y + dy][x + dx]) {
          visited[y + dy][x + dx] = visited[y][x] + 1;
          queue.push([y + dy, x + dx]);
        }
      }
    });

    if (top === queue.length) {
      return visited[y][x] - 1;
    }
  }
};

const checkIsRipe = () => {
  for (const i in visited) {
    for (const j in visited[i]) {
      if (!visited[i][j] && tomatoes[i][j] !== -1) {
        return false;
      }
    }
  }
  return true;
};

const days = bfs(getStart());
checkIsRipe() ? console.log(days) : console.log(-1);
