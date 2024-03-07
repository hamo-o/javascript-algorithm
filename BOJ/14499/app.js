const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m, x, y, k] = input[0].split(' ').map(Number);
const map = input.slice(1, n + 1).map((line) => line.split(' ').map(Number));
const com = input[n + 1].split(' ').map(Number);
const dice = new Array(6).fill(0);

let i = x;
let j = y;

com.forEach((num) => {
  let dx = 0;
  let dy = 0;

  if (num === 1) {
    dy++;
  } else if (num === 2) {
    dy--;
  } else if (num === 3) {
    dx--;
  } else if (num === 4) {
    dx++;
  }
  if (i + dx >= 0 && i + dx < n && j + dy >= 0 && j + dy < m) {
    i += dx;
    j += dy;
    rollDice(num);
    console.log(dice[0]);
    copy(i, j);
  }
});

function rollDice(num) {
  const temp = dice[0];
  if (num === 1) {
    dice[0] = dice[3];
    dice[3] = dice[5];
    dice[5] = dice[2];
    dice[2] = temp;
  } else if (num === 2) {
    dice[0] = dice[2];
    dice[2] = dice[5];
    dice[5] = dice[3];
    dice[3] = temp;
  } else if (num === 3) {
    dice[0] = dice[4];
    dice[4] = dice[5];
    dice[5] = dice[1];
    dice[1] = temp;
  } else if (num === 4) {
    dice[0] = dice[1];
    dice[1] = dice[5];
    dice[5] = dice[4];
    dice[4] = temp;
  }
}

function copy(i, j) {
  if (map[i][j]) {
    dice[5] = map[i][j];
    map[i][j] = 0;
  } else {
    map[i][j] = dice[5];
  }
}
