const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);
const coins = input.slice(1).map(Number);
coins.sort((a, b) => a - b);

const memo = new Array(k + 1).fill(0);
// 코인 1, 2, 5 순회
for (let i = 0; i < n; i++) {
  const coin = coins[i];
  // 목표값 1, 2, 3, ... ,10 순회
  for (let j = 1; j <= k; j++) {
    // coin 하나가 곧 구하려는 값이면
    if (j === coin) {
      memo[j] += 1;
    }
    // coin을 추가해서 만들 수 있는 경우의 수
    if (j - coin > 0) {
      memo[j] += memo[j - coin];
    }
  }
}

console.log(memo[k]);
