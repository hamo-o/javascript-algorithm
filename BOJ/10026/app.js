const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const colors = input.slice(1).map((line) => line.split(''));
const visited = new Array(n).fill(0).map(() => new Array(n).fill(false));
const visited_blind = new Array(n).fill(0).map(() => new Array(n).fill(false));

const bfs = (start) => {
  const queue = [];
  visited[start[0]][start[1]] = true;
  queue.push(start);

  let first = 0;
  while (first < queue.length) {
    const [row, col] = queue[first];
    first++;
    [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
    ].forEach((item) => {
      const [dx, dy] = item;
      if (
        col + dx < n &&
        col + dx >= 0 &&
        row + dy < n &&
        row + dy >= 0 &&
        !visited[row + dy][col + dx] &&
        colors[row][col] === colors[row + dy][col + dx]
      ) {
        visited[row + dy][col + dx] = true;
        queue.push([row + dy, col + dx]);
      }
    });
  }
};

const bfs_blind = (start) => {
  const queue = [];
  visited_blind[start[0]][start[1]] = true;
  queue.push(start);

  let first = 0;
  while (first < queue.length) {
    const [row, col] = queue[first];
    first++;
    [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
    ].forEach((item) => {
      const [dx, dy] = item;

      if (col + dx < n && col + dx >= 0 && row + dy < n && row + dy >= 0) {
        if (
          !visited_blind[row + dy][col + dx] &&
          !((colors[row][col] === 'B') ^ (colors[row + dy][col + dx] === 'B'))
        ) {
          visited_blind[row + dy][col + dx] = true;
          queue.push([row + dy, col + dx]);
        }
      }
    });
  }
};

const count = [0, 0];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!visited[i][j]) {
      bfs([i, j]);
      count[0]++;
    }
  }
}
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!visited_blind[i][j]) {
      bfs_blind([i, j]);
      count[1]++;
    }
  }
}

console.log(count.join(' '));
