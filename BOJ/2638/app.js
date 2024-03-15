const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const cheese = input.slice(1).map((line) => line.split(' ').map(Number));

let hour = 0;
while (countCheese()) {
  melt();
  hour++;
}
console.log(hour);

function melt() {
  const visited = new Array(n).fill(0).map(() => new Array(m).fill(0));
  const air = new Array(n).fill(0).map(() => new Array(m).fill(0));
  checkAir(air);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (cheese[i][j] && !visited[i][j]) {
        bfs([i, j], visited, air);
      }
    }
  }
}

function countCheese() {
  let cnt = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (cheese[i][j]) cnt++;
    }
  }

  return cnt;
}

function bfs(start, visited, air) {
  const queue = [];

  const [sx, sy] = start;
  visited[sx][sy] = 1;
  queue.push(start);

  const d = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let front = 0;
  while (front < queue.length) {
    const [x, y] = queue[front];
    front++;

    let cnt = 0;
    for (const [dx, dy] of d) {
      if (
        x + dx >= 0 &&
        x + dx < n &&
        y + dy >= 0 &&
        y + dy < m &&
        !visited[x + dx][y + dy]
      ) {
        if (!cheese[x + dx][y + dy] && air[x + dx][y + dy]) {
          cnt++;
        } else if (cheese[x + dx][y + dy]) {
          visited[x + dx][y + dy] = 1;
          queue.push([x + dx, y + dy]);
        }
      }
    }
    if (cnt >= 2) {
      cheese[x][y] = 0;
    }
  }
}

function checkAir(air) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!cheese[i][j]) {
        const queue = [];
        air[i][j] = 1;
        queue.push([i, j]);

        const d = [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ];

        let front = 0;
        while (front < queue.length) {
          const [x, y] = queue[front];
          front++;

          for (const [dx, dy] of d) {
            if (
              x + dx >= 0 &&
              x + dx < n &&
              y + dy >= 0 &&
              y + dy < m &&
              !air[x + dx][y + dy]
            ) {
              if (!cheese[x + dx][y + dy]) {
                air[x + dx][y + dy] = 1;
                queue.push([x + dx, y + dy]);
              }
            }
          }
        }
      }
      return;
    }
  }
}
