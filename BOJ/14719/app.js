const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [h, w] = input[0].split(' ').map(Number);
const blocks = input[1].split(' ').map(Number);
// 길이 500

let answer = 0;
let [left, right] = findStart(0);
while (left < w - 1 && right < w) {
  if (left === -1) break;
  answer += calcWater(left, right);
  [left, right] = findStart(right);
}

console.log(answer);

function findStart(start) {
  for (let i = start; i < w - 2; i++) {
    // 시작 바로 다음칸은 무조건 내려가야함
    if (blocks[i] > blocks[i + 1]) {
      const next = i + 1;
      let max_idx = next + 1;
      for (let j = next + 1; j < w; j++) {
        // 시작 칸보다 높거나 같은게 나타나면 그게 바로 끝 칸
        if (blocks[max_idx] >= blocks[i]) break;

        // 끝 칸은 시작 칸 이후 가장 높은 칸이어야 함
        if (blocks[max_idx] <= blocks[j]) {
          max_idx = j;
        }
      }
      // 끝 칸은 시작 바로 다음칸보다 높아야함
      if (blocks[next] < blocks[max_idx]) {
        return [i, max_idx];
      }
    }
  }
  return [-1, -1];
}

function calcWater(left, right) {
  const maxHeight = Math.min(blocks[left], blocks[right]);
  let temp = 0;
  for (let i = left + 1; i < right; i++) {
    temp += maxHeight - blocks[i];
  }
  return temp;
}
