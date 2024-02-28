const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const numbers = input[1].split(' ').map(Number);
const memo = new Array(n).fill(0).map(() => []);

for (let i = 0; i < n; i++) {
  memo[i].push(numbers[i]);
}

for (let i = 0; i < n; i++) {
  const pivot = numbers[i];
  for (let j = i + 1; j < n; j++) {
    if (pivot < numbers[j]) {
      const a = memo[i].length;
      const b = memo[j].length;
      if (a + 1 > b) {
        memo[j] = memo[i].slice();
        memo[j].push(numbers[j]);
      }
    }
  }
}

let len = 0;
let answer = '';
memo.forEach((arr) => {
  if (len < arr.length) {
    len = arr.length;
    answer = arr.join(' ');
  }
});

console.log(len);
console.log(answer);
