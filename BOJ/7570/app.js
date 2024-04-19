const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const num = +input[0];
const children = input[1].split(' ').map(Number);

const memo = new Array(num + 1).fill(0);
for (let i = 0; i < num; i++) {
  const cur = children[i];
  if (cur === 1) memo[1] = 1;
  else memo[cur] = memo[cur - 1] + 1;
}

const fixed = Math.max(...memo);
console.log(num - fixed);
