const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

const sums = [];
const count = {};
numbers.reduce((acc, cur) => {
  if (count[acc + cur]) count[acc + cur]++;
  else count[acc + cur] = 1;
  sums.push(acc + cur);
  return acc + cur;
}, 0);

let answer = count[k] ? count[k] : 0;
sums.forEach((sum) => {
  count[sum]--;
  if (count[sum + k]) answer += count[sum + k];
});

console.log(answer);
