const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const num = +input[0];
const children = input.slice(1).map(Number);

const memo = new Array(num).fill(1);
for (let i = 0; i < num; i++) {
  const pivot = children[i];
  for (let j = i + 1; j < num; j++) {
    if (pivot < children[j]) {
      memo[j] = Math.max(memo[j], memo[i] + 1);
    }
  }
}

const fixed = Math.max(...memo);
console.log(num - fixed);
