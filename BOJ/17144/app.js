const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [r, c, t] = input[0].split(' ').map(Number);
const board = input.slice(1).map((line) => line.split(' ').map(Number));

for (let k = 0; k < t; k++) {
  const dusts = new Array(r).fill(0).map(() => new Array(c).fill(0));

  // 미세먼지 이동
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (board[i][j] > 0) {
        move([i, j], dusts);
      }
    }
  }

  // 공기청정기 작동
  clean(dusts);

  // board와 dusts 동기화
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (board[i][j] !== -1) {
        board[i][j] = dusts[i][j];
      }
    }
  }
}

// 답 구하기
let answer = 0;
for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (board[i][j] > 0) answer += board[i][j];
  }
}
console.log(answer);

function move([x, y], dusts) {
  const dust = Math.floor(board[x][y] / 5);
  let cnt = 0;
  [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ].forEach(([dx, dy]) => {
    if (
      x + dx >= 0 &&
      x + dx < r &&
      y + dy >= 0 &&
      y + dy < c &&
      board[x + dx][y + dy] !== -1
    ) {
      dusts[x + dx][y + dy] += dust;
      cnt++;
    }
  });
  dusts[x][y] += board[x][y] - dust * cnt;
}

function clean(dusts) {
  for (let i = 2; i < r; i++) {
    if (board[i][0] === -1) {
      let prev = dusts[i][1];
      dusts[i][1] = 0;
      let next = 0;
      // 우
      for (let k = 2; k < c; k++) {
        next = dusts[i][k];
        dusts[i][k] = prev;
        prev = next;
      }
      // 상
      for (let k = i - 1; k >= 0; k--) {
        next = dusts[k][c - 1];
        dusts[k][c - 1] = prev;
        prev = next;
      }
      // 좌
      for (let k = c - 2; k >= 0; k--) {
        next = dusts[0][k];
        dusts[0][k] = prev;
        prev = next;
      }
      // 하
      for (let k = 1; k < i; k++) {
        next = dusts[k][0];
        dusts[k][0] = prev;
        prev = next;
      }

      // 우
      prev = dusts[i + 1][1];
      dusts[i + 1][1] = 0;
      for (let k = 2; k < c; k++) {
        next = dusts[i + 1][k];
        dusts[i + 1][k] = prev;
        prev = next;
      }
      // 하
      for (let k = i + 2; k < r; k++) {
        next = dusts[k][c - 1];
        dusts[k][c - 1] = prev;
        prev = next;
      }
      // 좌
      for (let k = c - 2; k >= 0; k--) {
        next = dusts[r - 1][k];
        dusts[r - 1][k] = prev;
        prev = next;
      }
      // 상
      for (let k = r - 2; k > i; k--) {
        next = dusts[k][0];
        dusts[k][0] = prev;
        prev = next;
      }
      break;
    }
  }
}
