const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const grounds = input.slice(1).map((line) => line.split(' ').map(Number));

const bfs = (start, h, visited) => {
  const queue = [];

  const [x, y] = start;
  visited[x][y] = 1;
  queue.push(start);

  let front = 0;
  while (front < queue.length) {
    const cur = queue[front];
    const [x, y] = cur;
    front++;

    [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ].forEach((item) => {
      const [dx, dy] = item;

      if (
        x + dx >= 0 &&
        x + dx < n &&
        y + dy >= 0 &&
        y + dy < n &&
        grounds[x + dx][y + dy] > h &&
        !visited[x + dx][y + dy]
      ) {
        visited[x + dx][y + dy] = 1;
        queue.push([x + dx, y + dy]);
      }
    });
  }
};

const findStart = (h) => {
  const answer = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grounds[i][j] > h) {
        answer.push([i, j]);
      }
    }
  }
  return answer;
};

let answer = 0;
for (let height = 0; height <= 100; height++) {
  const visited = new Array(n).fill(0).map(() => new Array(n).fill(0));
  const starts = findStart(height);

  let count = 0;
  for (const start of starts) {
    const [x, y] = start;
    if (!visited[x][y]) {
      bfs(start, height, visited);
      count++;
    }
  }

  answer = Math.max(count, answer);
}

console.log(answer);
