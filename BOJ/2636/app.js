const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const cheese = input.slice(1).map((line) => line.split(' ').map(Number));

let hour = 0;
let prev = countCheese();
while (true) {
  melt();
  hour++;

  const cnt = countCheese();
  if (!cnt) break;
  prev = cnt;
}
console.log(hour);
console.log(prev);

function melt() {
  // visited는 원래 치즈의 위치이지만, 녹아 없어진 공간을 표시
  const visited = new Array(n).fill(0).map(() => new Array(m).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!cheese[i][j] && !visited[i][j] && !checkIsHole([i, j])) {
        bfs([i, j], visited);
        return;
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

function checkIsHole([x, y]) {
  let t = x;
  let b = x;
  let l = y;
  let r = y;

  while (t < n) {
    if (cheese[t][y]) break;
    t++;
  }
  while (b >= 0) {
    if (cheese[b][y]) break;
    b--;
  }
  while (r < m) {
    if (cheese[x][r]) break;
    r++;
  }
  while (l >= 0) {
    if (cheese[x][l]) break;
    l--;
  }

  if (t === n || b === -1 || r === m || l === -1) return false;
  return true;
}

function bfs(start, visited) {
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

    for (const [dx, dy] of d) {
      if (
        x + dx >= 0 &&
        x + dx < n &&
        y + dy >= 0 &&
        y + dy < m &&
        !visited[x + dx][y + dy]
      ) {
        visited[x + dx][y + dy] = 1;
        // 치즈면
        if (cheese[x + dx][y + dy]) {
          cheese[x + dx][y + dy] = 0;
        }
        // 치즈가 아니면
        else {
          queue.push([x + dx, y + dy]);
        }
      }
    }
  }
}
