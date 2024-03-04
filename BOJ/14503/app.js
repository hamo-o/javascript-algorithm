const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const [r, c, d] = input[1].split(' ').map(Number);
const grid = input.slice(2).map((line) => line.split(' ').map(Number));

let count = 0;
clean([r, c, d]);
console.log(count);

function clean(cur) {
  const [x, y, dir] = cur;

  if (!grid[x][y]) {
    grid[x][y] = 2;
    count++;
  }

  if (grid[x - 1][y] && grid[x + 1][y] && grid[x][y - 1] && grid[x][y + 1]) {
    const next = checkMove(cur, 0);
    if (next) clean(next);
    else return;
  } else {
    const next = checkMove(cur, 1);
    clean(next);
  }
}

function checkMove(cur, state) {
  const [x, y, dir] = cur;

  if (!state) {
    if (dir === 0) {
      return grid[x + 1][y] !== 1 ? [x + 1, y, dir] : false;
    } else if (dir === 1) {
      return grid[x][y - 1] !== 1 ? [x, y - 1, dir] : false;
    } else if (dir === 2) {
      return grid[x - 1][y] !== 1 ? [x - 1, y, dir] : false;
    } else if (dir === 3) {
      return grid[x][y + 1] !== 1 ? [x, y + 1, dir] : false;
    }
  } else {
    const newDir = (dir + 3) % 4;
    if (newDir === 0) {
      return !grid[x - 1][y] ? [x - 1, y, newDir] : [x, y, newDir];
    } else if (newDir === 1) {
      return !grid[x][y + 1] ? [x, y + 1, newDir] : [x, y, newDir];
    } else if (newDir === 2) {
      return !grid[x + 1][y] ? [x + 1, y, newDir] : [x, y, newDir];
    } else if (newDir === 3) {
      return !grid[x][y - 1] ? [x, y - 1, newDir] : [x, y, newDir];
    }
  }
}
