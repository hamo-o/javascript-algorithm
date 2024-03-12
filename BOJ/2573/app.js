const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const ice = input.splice(1).map((line) => line.split(' ').map(Number));

function findStart() {
  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < m - 1; j++) {
      if (ice[i][j]) {
        return [i, j];
      }
    }
  }
}

function bfs(start, visited) {
  const queue = [];
  visited[start[0]][start[1]] = 1;
  queue.push(start);

  const d = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  let front = 0;
  while (front < queue.length) {
    const [x, y] = queue[front];
    front++;

    for (const [dx, dy] of d) {
      if (x + dx >= 0 && x + dx < n && y + dy >= 0 && y + dy < m) {
        if (!visited[x + dx][y + dy]) {
          if (!ice[x + dx][y + dy] && ice[x][y]) {
            ice[x][y]--;
          } else if (ice[x + dx][y + dy]) {
            visited[x + dx][y + dy] = 1;
            queue.push([x + dx, y + dy]);
          }
        }
      }
    }
  }
}

function checkIsSep(visited) {
  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < m - 1; j++) {
      if (ice[i][j] && !visited[i][j]) {
        return true;
      }
    }
  }
  return false;
}

function findAnswer() {
  let answer = 0;
  while (true) {
    const visited = new Array(n).fill(0).map(() => new Array(m).fill(0));
    const start = findStart();
    if (!start) return 0;

    bfs(start, visited);
    if (checkIsSep(visited)) return answer;

    answer++;
  }
}

console.log(findAnswer());
