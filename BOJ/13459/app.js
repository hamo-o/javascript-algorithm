const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const board = input.slice(1).map((line) => line.split(''));

const [red, blue] = findBall();
const answer = dfs(0, [red, blue, board]);
console.log(answer);

function findBall() {
  const answer = [
    [0, 0],
    [0, 0],
  ];
  for (let i = 1; i < n - 1; i++) {
    for (let j = 1; j < m - 1; j++) {
      if (board[i][j] === 'R') {
        answer[0][0] = i;
        answer[0][1] = j;
      } else if (board[i][j] === 'B') {
        answer[1][0] = i;
        answer[1][1] = j;
      }
    }
  }

  return answer;
}

function dfs(depth, [red, blue, grid]) {
  if (depth === 10) return 0;

  const u = up(red, blue, grid);
  const d = down(red, blue, grid);
  const l = left(red, blue, grid);
  const r = right(red, blue, grid);

  if (u === 1 || d === 1 || l === 1 || r === 1) return 1;

  return (
    (u !== -1 && dfs(depth + 1, u)) ||
    (d !== -1 && dfs(depth + 1, d)) ||
    (l !== -1 && dfs(depth + 1, l)) ||
    (r !== -1 && dfs(depth + 1, r))
  );
}

function up([x1, y1], [x2, y2], b) {
  const grid = b.map((line) => [...line]);
  let i1 = x1;
  let i2 = x2;
  let red = 0;
  let blue = 0;

  if (y1 === y2 && x1 > x2) {
    blue = moveBlue();
    red = moveRed();
  } else {
    red = moveRed();
    blue = moveBlue();
  }

  function moveRed() {
    while (i1 > 0) {
      if (grid[i1 - 1][y1] === '#') break;
      else if (grid[i1 - 1][y1] === 'O') {
        grid[x1][y1] = '.';
        return 1;
      } else if (grid[i1 - 1][y1] === 'B') break;
      i1--;
    }
    [grid[i1][y1], grid[x1][y1]] = [grid[x1][y1], grid[i1][y1]];
  }

  function moveBlue() {
    while (i2 > 0) {
      if (grid[i2 - 1][y2] === '#') break;
      else if (grid[i2 - 1][y2] === 'O') return 1;
      else if (grid[i2 - 1][y2] === 'R') break;
      i2--;
    }
    [grid[i2][y2], grid[x2][y2]] = [grid[x2][y2], grid[i2][y2]];
  }

  if (blue) return -1;
  if (red) return 1;
  return [[i1, y1], [i2, y2], grid];
}

function down([x1, y1], [x2, y2], b) {
  const grid = b.map((line) => [...line]);
  let i1 = x1;
  let i2 = x2;
  let red = 0;
  let blue = 0;

  if (y1 === y2 && x1 < x2) {
    blue = moveBlue();
    red = moveRed();
  } else {
    red = moveRed();
    blue = moveBlue();
  }

  function moveRed() {
    while (i1 < n - 1) {
      if (grid[i1 + 1][y1] === '#') break;
      else if (grid[i1 + 1][y1] === 'O') {
        grid[x1][y1] = '.';
        return 1;
      } else if (grid[i1 + 1][y1] === 'B') break;
      i1++;
    }
    [grid[i1][y1], grid[x1][y1]] = [grid[x1][y1], grid[i1][y1]];
  }

  function moveBlue() {
    while (i2 < n - 1) {
      if (grid[i2 + 1][y2] === '#') break;
      else if (grid[i2 + 1][y2] === 'O') return 1;
      else if (grid[i2 + 1][y2] === 'R') break;
      i2++;
    }
    [grid[i2][y2], grid[x2][y2]] = [grid[x2][y2], grid[i2][y2]];
  }

  if (blue) return -1;
  if (red) return 1;
  return [[i1, y1], [i2, y2], grid];
}

function left([x1, y1], [x2, y2], b) {
  const grid = b.map((line) => [...line]);
  let j1 = y1;
  let j2 = y2;
  let red = 0;
  let blue = 0;

  if (x1 === x2 && y1 > y2) {
    blue = moveBlue();
    red = moveRed();
  } else {
    red = moveRed();
    blue = moveBlue();
  }

  function moveRed() {
    while (j1 > 0) {
      if (grid[x1][j1 - 1] === '#') break;
      else if (grid[x1][j1 - 1] === 'O') {
        grid[x1][y1] = '.';
        return 1;
      } else if (grid[x1][j1 - 1] === 'B') break;
      j1--;
    }
    [grid[x1][j1], grid[x1][y1]] = [grid[x1][y1], grid[x1][j1]];
  }

  function moveBlue() {
    while (j2 > 0) {
      if (grid[x2][j2 - 1] === '#') break;
      else if (grid[x2][j2 - 1] === 'O') return 1;
      else if (grid[x2][j2 - 1] === 'R') break;
      j2--;
    }
    [grid[x2][j2], grid[x2][y2]] = [grid[x2][y2], grid[x2][j2]];
  }

  if (blue) return -1;
  if (red) return 1;
  return [[x1, j1], [x2, j2], grid];
}

function right([x1, y1], [x2, y2], b) {
  const grid = b.map((line) => [...line]);
  let j1 = y1;
  let j2 = y2;
  let red = 0;
  let blue = 0;

  if (x1 === x2 && y1 < y2) {
    blue = moveBlue();
    red = moveRed();
  } else {
    red = moveRed();
    blue = moveBlue();
  }

  function moveRed() {
    while (j1 < m - 1) {
      if (grid[x1][j1 + 1] === '#') break;
      else if (grid[x1][j1 + 1] === 'O') {
        grid[x1][y1] = '.';
        return 1;
      } else if (grid[x1][j1 + 1] === 'B') break;
      j1++;
    }
    [grid[x1][j1], grid[x1][y1]] = [grid[x1][y1], grid[x1][j1]];
  }

  function moveBlue() {
    while (j2 < m - 1) {
      if (grid[x2][j2 + 1] === '#') break;
      else if (grid[x2][j2 + 1] === 'O') return 1;
      else if (grid[x2][j2 + 1] === 'R') break;
      j2++;
    }
    [grid[x2][j2], grid[x2][y2]] = [grid[x2][y2], grid[x2][j2]];
  }

  if (blue) return -1;
  if (red) return 1;
  return [[x1, j1], [x2, j2], grid];
}
