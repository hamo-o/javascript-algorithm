const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const board = input
  .slice(1)
  .map((line) => line.split('').map((item) => (item === '.' ? 0 : -1)));

function bfs(start, range) {
  const queue = [];
  queue.push(range);

  const [x, y] = start;

  let front = 0;
  while (front < queue.length) {
    const d = queue[front];
    front++;

    if (
      x - d >= 0 &&
      x + d < n &&
      y - d >= 0 &&
      y + d < m &&
      board[x + d][y] &&
      board[x - d][y] &&
      board[x][y + d] &&
      board[x][y - d]
    ) {
      board[x][y] = 1;
      board[x + d][y] = 1;
      board[x - d][y] = 1;
      board[x][y + d] = 1;
      board[x][y - d] = 1;
      queue.push(d + 1);
    }
  }

  return front - 1;
}

function checkIsAllVisited() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === -1) {
        return false;
      }
    }
  }
  return true;
}

const answer = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j]) {
      const count = bfs([i, j], 1);
      if (count) {
        answer.push(`${i + 1} ${j + 1} ${count}`);
      }
    }
  }
}

if (checkIsAllVisited()) {
  console.log(answer.length);
  answer.forEach((item) => {
    console.log(item);
  });
} else {
  console.log(-1);
}
