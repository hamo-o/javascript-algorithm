const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const grid = input.slice(1).map((line) => line.split(' ').map(Number));

function bfs(start, size, visited) {
  const queue = [];
  const [sx, sy] = start;
  visited[sx][sy] = 1;
  queue.push([sx, sy]);

  const d = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  let front = 0;
  const eats = [];
  while (front < queue.length) {
    const [x, y] = queue[front];
    front++;

    for (const [dx, dy] of d) {
      if (
        x + dx >= 0 &&
        x + dx < n &&
        y + dy >= 0 &&
        y + dy < n &&
        grid[x + dx][y + dy] <= size
      ) {
        if (!visited[x + dx][y + dy]) {
          visited[x + dx][y + dy] = visited[x][y] + 1;
          // 먹을 수 있는 물고기가 있는 경우
          if (grid[x + dx][y + dy] && grid[x + dx][y + dy] < size) {
            eats.push([visited[x + dx][y + dy], x + dx, y + dy]);
          }
          // 먹을 수 있는 물고기가 없는 경우
          else {
            queue.push([x + dx, y + dy]);
          }
        }
      }
    }
  }

  // 가장 가까운, 가장 위, 가장 왼쪽에 위치한 물고기 찾아서 먹기
  if (eats.length) {
    eats.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
    const [, x, y] = eats[0];
    grid[x][y] = 0;
    return [x, y];
  }
}

function findStart() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 9) {
        grid[i][j] = 0;
        return [i, j];
      }
    }
  }
}

let [nx, ny] = findStart();
let size = 2;
let answer = 0;
let count = 0;
while (true) {
  // visited[x][y] = 시간
  const visited = new Array(n).fill(0).map(() => new Array(n).fill(0));
  const arr = bfs([nx, ny], size, visited);

  if (!arr) break;

  [nx, ny] = arr;
  answer += visited[nx][ny] - 1;
  count++;
  if (count === size) {
    size++;
    count = 0;
  }
}
console.log(answer);
