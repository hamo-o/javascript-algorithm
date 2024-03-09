const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const board = input.slice(1).map((line) => line.split(' ').map(Number));

let answer = 0;
dfs(board, 0);
console.log(answer);

function dfs(pick, depth) {
  if (depth === 5) {
    answer = Math.max(answer, calcMaxNum(pick));
    return;
  }

  for (const dir of [0, 1, 2, 3]) {
    const temp = new Array(n).fill(0).map(() => new Array(n).fill(0));
    // 상
    if (dir === 0) {
      for (let j = 0; j < n; j++) {
        const line = [];
        for (let i = 0; i < n; i++) {
          if (pick[i][j]) {
            line.push(pick[i][j]);
          }
        }
        let k = 0;
        let l = 0;
        while (k < line.length) {
          if (k + 1 < line.length && line[k] === line[k + 1]) {
            line[k] *= 2;
            temp[l][j] = line[k];
            k += 2;
          } else {
            temp[l][j] = line[k];
            k++;
          }
          l++;
        }
      }
    }
    // 하
    else if (dir === 1) {
      for (let j = 0; j < n; j++) {
        const line = [];
        for (let i = 0; i < n; i++) {
          if (pick[i][j]) {
            line.push(pick[i][j]);
          }
        }
        let k = line.length - 1;
        let l = n - 1;
        while (k >= 0) {
          if (k - 1 >= 0 && line[k] === line[k - 1]) {
            line[k] *= 2;
            temp[l][j] = line[k];
            k -= 2;
          } else {
            temp[l][j] = line[k];
            k--;
          }
          l--;
        }
      }
    }
    // 좌
    else if (dir === 2) {
      for (let i = 0; i < n; i++) {
        const line = [];
        for (let j = 0; j < n; j++) {
          if (pick[i][j]) {
            line.push(pick[i][j]);
          }
        }
        let k = 0;
        let l = 0;
        while (k < line.length) {
          if (k + 1 < line.length && line[k] === line[k + 1]) {
            line[k] *= 2;
            temp[i][l] = line[k];
            k += 2;
          } else {
            temp[i][l] = line[k];
            k++;
          }
          l++;
        }
      }
    }
    // 우
    else if (dir === 3) {
      for (let i = 0; i < n; i++) {
        const line = [];
        for (let j = 0; j < n; j++) {
          if (pick[i][j]) {
            line.push(pick[i][j]);
          }
        }
        let k = line.length - 1;
        let l = n - 1;
        while (k >= 0) {
          if (k - 1 >= 0 && line[k] === line[k - 1]) {
            line[k] *= 2;
            temp[i][l] = line[k];
            k -= 2;
          } else {
            temp[i][l] = line[k];
            k--;
          }
          l--;
        }
      }
    }

    dfs(temp, depth + 1);
    // 더이상 못움직이면 체크
    answer = Math.max(answer, calcMaxNum(pick));
  }

  return answer;
}

function calcMaxNum(grid) {
  let max = 0;
  grid.forEach((line) => {
    max = Math.max(...line, max);
  });

  return max;
}
