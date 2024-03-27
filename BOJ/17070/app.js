const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const board = input.slice(1).map((line) => line.split(' ').map(Number));

// [x][y][방향] = 경우의수
// 0 가로
// 1 대각선
// 2 세로
// 기준은 파이프의 끝
const memo = new Array(n)
  .fill(0)
  .map(() => new Array(n).fill(0).map(() => new Array(3).fill(0)));

memo[0][1][0] = 1;
for (let i = 0; i < n; i++) {
  for (let j = 1; j < n; j++) {
    // 놓일 칸이 비어있는지 확인
    if (!board[i][j]) {
      // 가로인 경우, 왼쪽 칸 (가로) (대각선)
      memo[i][j][0] += memo[i][j - 1][0] + memo[i][j - 1][1];

      if (i - 1 >= 0) {
        // 세로인 경우, 위쪽 칸(세로) (대각선)
        memo[i][j][2] += memo[i - 1][j][2] + memo[i - 1][j][1];
      }
    }

    // 놓일 칸이 비어있는지 확인
    if (i - 1 >= 0 && !board[i][j] && !board[i][j - 1] && !board[i - 1][j]) {
      // 대각선인 경우, 왼쪽 위 대각선(가로) (세로) (대각선)
      memo[i][j][1] +=
        memo[i - 1][j - 1][0] + memo[i - 1][j - 1][1] + memo[i - 1][j - 1][2];
    }
  }
}

const answer = memo[n - 1][n - 1].reduce((acc, cur) => {
  return acc + cur;
}, 0);
console.log(answer);
