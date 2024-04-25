const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const weights = input[1].split(' ').map(Number);
weights.sort((a, b) => a - b);

let answer = 1;
for (let i = 0; i < n; i++) {
  if (weights[i] > answer) break;
  answer += weights[i];
}

console.log(answer);
