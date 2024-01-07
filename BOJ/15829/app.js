const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [len, str] = input;

const square = [1];
for (i = 1; i < 50; i++) {
  square.push((31 * square[i - 1]) % 1234567891);
}

let sum = 0;
for (const idx in str) {
  const num = str[idx].charCodeAt() - 96;
  sum += (num * square[idx]) % 1234567891;
}

const answer = sum % 1234567891;
console.log(answer);
