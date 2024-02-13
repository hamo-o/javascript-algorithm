const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const map = input.slice(1).map((line) => line.split(' ').map(Number));

const visited = new Array(n).fill(0).map(() => new Array(m).fill(0));
const starts = [];
let max_count = 0;

function bfs(start, map) {
  const queue = [];
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
        x + dx < n &&
        y + dy >= 0 &&
        y + dy < m &&
        !map[x + dx][y + dy]
      ) {
        map[x + dx][y + dy] = 2;
        queue.push([x + dx, y + dy]);
      }
    });
  }
}

function dfs(pick) {
  if (pick.length === 3) {
    const arr = map.map((line) => [...line]);
    pick.forEach(([x, y]) => {
      arr[x][y] = 1;
    });

    starts.forEach(([x, y]) => {
      bfs([x, y], arr);
    });

    let count = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (!arr[i][j]) {
          count++;
        }
      }
    }

    max_count = Math.max(count, max_count);
    return;
  }

  const start = pick.length ? pick[pick.length - 1][0] : 0;
  for (let i = start; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j] && !map[i][j]) {
        visited[i][j] = 1;
        pick.push([i, j]);
        dfs(pick);
        pick.pop();
        visited[i][j] = 0;
      }
    }
  }
}

function findStarts() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] === 2) {
        starts.push([i, j]);
      }
    }
  }
}

findStarts();
dfs([]);
console.log(max_count);
