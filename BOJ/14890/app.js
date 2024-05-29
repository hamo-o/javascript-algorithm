const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [n, l] = input[0].split(" ").map(Number);
const map = input.slice(1).map((line) => line.split(" ").map(Number));

let count = 0;

for (let i = 0; i < n; i++) {
  let flag = true;
  const stairs = new Array(n).fill(0);
  for (let j = 0; j < n - 1; j++) {
    if (Math.abs(map[i][j] - map[i][j + 1]) > 1) {
      flag = false;
    } else if (map[i][j] < map[i][j + 1]) {
      if (
        j - l + 1 >= 0 &&
        !stairs[j - l + 1] &&
        checkRowIsSame(i, j - l + 1, j)
      ) {
        for (let k = j - l + 1; k <= j; k++) {
          stairs[k] = 1;
        }
      } else {
        flag = false;
      }
    } else if (map[i][j] > map[i][j + 1]) {
      if (j + l < n && checkRowIsSame(i, j + 1, j + l)) {
        for (let k = j + 1; k <= j + l; k++) {
          stairs[k] = 1;
        }
      } else {
        flag = false;
      }
    }
  }
  if (flag) count++;
}

for (let i = 0; i < n; i++) {
  let flag = true;
  const stairs = new Array(n).fill(0);
  for (let j = 0; j < n - 1; j++) {
    if (Math.abs(map[j][i] - map[j + 1][i]) > 1) {
      flag = false;
    } else if (map[j][i] < map[j + 1][i]) {
      if (
        j - l + 1 >= 0 &&
        !stairs[j - l + 1] &&
        checkColIsSame(i, j - l + 1, j)
      ) {
        for (let k = j - l + 1; k <= j; k++) {
          stairs[k] = 1;
        }
      } else {
        flag = false;
      }
    } else if (map[j][i] > map[j + 1][i]) {
      if (j + l < n && checkColIsSame(i, j + 1, j + l)) {
        for (let k = j + 1; k <= j + l; k++) {
          stairs[k] = 1;
        }
      } else {
        flag = false;
      }
    }
  }
  if (flag) count++;
}

function checkRowIsSame(line, start, end) {
  const value = map[line][start];
  for (let i = start + 1; i <= end; i++) {
    if (map[line][i] !== value) return false;
  }
  return true;
}

function checkColIsSame(line, start, end) {
  const value = map[start][line];
  for (let i = start + 1; i <= end; i++) {
    if (map[i][line] !== value) return false;
  }
  return true;
}

console.log(count);
