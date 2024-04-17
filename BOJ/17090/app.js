const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const maze = input.slice(1).map((line) => line.split(''));
const check = new Array(n).fill(0).map(() => new Array(m).fill(-1));

let answer = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (check[i][j] === -1) dfs(i, j);
    if (check[i][j] === 1) answer++;
  }
}
console.log(answer);

function dfs(x, y) {
  let dx = 0;
  let dy = 0;
  if (maze[x][y] === 'D') dx = 1;
  else if (maze[x][y] === 'U') dx = -1;
  else if (maze[x][y] === 'R') dy = 1;
  else if (maze[x][y] === 'L') dy = -1;

  // 다음 칸이 아직 미로 내부에 있는 경우
  if (x + dx >= 0 && x + dx < n && y + dy >= 0 && y + dy < m) {
    // 다음 칸이 방문 전이면
    if (check[x + dx][y + dy] === -1) {
      check[x + dx][y + dy] = 0;
      check[x][y] = dfs(x + dx, y + dy);
    } else {
      check[x][y] = check[x + dx][y + dy];
    }
  }
  // 다음 칸이 미로 바깥인 경우
  else {
    check[x][y] = 1;
  }

  return check[x][y];
}
