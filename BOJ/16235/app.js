const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m, k] = input[0].split(' ').map(Number);
const a = input.slice(1, 1 + n).map((line) => line.split(' ').map(Number));
const trees = input.slice(1 + n).map((line) => line.split(' ').map(Number));

const grounds = new Array(n)
  .fill(0)
  .map(() => new Array(n).fill(0).map(() => []));
const dead = new Array(n).fill(0).map(() => new Array(n).fill(0));
const foods = new Array(n).fill(0).map(() => new Array(n).fill(5));

// 나무 심기
trees.forEach(([x, y, age]) => {
  grounds[x - 1][y - 1].push(age);
});

for (let year = 0; year < k; year++) {
  // 봄에는 나무가 자신의 나이만큼 양분을 먹고, 나이 1 증가
  // 나무가 있는 칸의 양분만 먹을 수 있음
  // 하나의 칸에 여러 개의 나무 -> 나이가 어린 나무부터 양분 먹음
  // 자신의 나이만큼 양분을 먹지 못하면 나무 즉시 죽음
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const len = grounds[i][j].length;
      if (len) {
        grounds[i][j].sort((a, b) => a - b);
        for (let a = 0; a < len; a++) {
          // 나무의 나이보다 남은 양분이 같거나 크면
          if (foods[i][j] >= grounds[i][j][a]) {
            foods[i][j] -= grounds[i][j][a];
            grounds[i][j][a]++;
          } else {
            let num = len - 1;
            while (a <= num) {
              const age = grounds[i][j].pop();
              dead[i][j] += Math.floor(age / 2);
              num--;
            }
            break;
          }
        }
      }
    }
  }

  // 여름에는 죽은 나무가 양분으로 변함
  // 나이를 2로 나눈 값이 양분의 값 (소수점 아래 버림)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      foods[i][j] += dead[i][j];
      dead[i][j] = 0;
    }
  }

  // 가을에는 나무 번식
  // 번식할 수 있는 나무는 나이가 5의 배수인 나무
  // 번식 시 인접한 8개의 칸에 나이가 1인 나무가 생김
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      grounds[i][j].forEach((age) => {
        if (!(age % 5)) {
          [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
          ].forEach(([dx, dy]) => {
            if (i + dx >= 0 && i + dx < n && j + dy >= 0 && j + dy < n) {
              grounds[i + dx][j + dy].push(1);
            }
          });
        }
      });
    }
  }

  // 겨울에는 a배열대로 양분 추가
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (a[i][j]) {
        foods[i][j] += a[i][j];
      }
    }
  }
}

let answer = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    answer += grounds[i][j].length;
  }
}

console.log(answer);
