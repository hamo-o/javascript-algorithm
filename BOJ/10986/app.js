const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const arr = [];
const numbers = input[1].split(' ').map(Number);
numbers.reduce((acc, cur) => {
  arr.push(((acc % m) + (cur % m)) % m);
  return acc + cur;
}, 0);
const count = new Array(m).fill(0);

arr.forEach((item) => {
  count[item]++;
});

let answer = count[0];
for (let i = 0; i < m; i++) {
  answer += (count[i] * (count[i] - 1)) / 2;
}
console.log(answer);
