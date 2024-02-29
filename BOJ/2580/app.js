const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const board = input.map((line) => line.split(' ').map(Number));
const empty = [];

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (!board[i][j]) {
      empty.push([i, j]);
    }
  }
}

dfs(0);

var flag = false;
function dfs(i) {
  if (i === empty.length) {
    board.forEach((line) => {
      console.log(line.join(' '));
    });
    flag = true;
    return;
  }

  for (let num = 1; num <= 9; num++) {
    if (
      checkRow(empty[i][0], num) &&
      checkCol(empty[i][1], num) &&
      checkSquare(empty[i], num) &&
      !flag
    ) {
      const [x, y] = empty[i];
      board[x][y] = num;
      dfs(i + 1);
      board[x][y] = 0;
    }
  }
}

function checkRow(row, num) {
  for (let j = 0; j < 9; j++) {
    if (board[row][j] === num) return false;
  }
  return true;
}

function checkCol(col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }
  return true;
}

function checkSquare([row, col], num) {
  const a = Math.floor(row / 3) * 3;
  const b = Math.floor(col / 3) * 3;

  for (let i = a; i < a + 3; i++) {
    for (let j = b; j < b + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }
  return true;
}
