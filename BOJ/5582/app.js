const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const map = input.slice(1).map((line) => line.split('').map(Number));
const visited = new Array(n)
  .fill(0)
  .map(() => new Array(m).fill(0).map(() => new Array(2).fill(0)));

const queue = [];
visited[0][0][0] = 1;
queue.push('0 0 0');

let front = 0;
while (front < queue.length) {
  const [x, y, count] = queue[front].split(' ').map(Number);
  front++;

  [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ].forEach(([dx, dy]) => {
    if (x + dx >= 0 && x + dx < n && y + dy >= 0 && y + dy < m) {
      if (map[x + dx][y + dy] && !count && !visited[x + dx][y + dy][1]) {
        visited[x + dx][y + dy][1] = visited[x][y][0] + 1;
        queue.push(`${x + dx} ${y + dy} 1`);
      } else if (!map[x + dx][y + dy] && !visited[x + dx][y + dy][count]) {
        visited[x + dx][y + dy][count] = visited[x][y][count] + 1;
        queue.push(`${x + dx} ${y + dy} ${count}`);
      }
    }
  });
}

let answer = 0;
if (visited[n - 1][m - 1][0] && visited[n - 1][m - 1][1]) {
  answer = Math.min(visited[n - 1][m - 1][0], visited[n - 1][m - 1][1]);
} else if (visited[n - 1][m - 1][0]) {
  answer = visited[n - 1][m - 1][0];
} else if (visited[n - 1][m - 1][1]) {
  answer = visited[n - 1][m - 1][1];
} else {
  answer = -1;
}

console.log(answer);
