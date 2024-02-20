const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const t = +input[0];

let start = 1;
for (let i = 0; i < t; i++) {
  const n = +input[start];
  const phone = input.slice(start + 1, start + n + 1);
  const answer = checkIsOk(phone, n);
  console.log(answer);
  start += n + 1;
}

function checkIsOk(numbers, n) {
  numbers.sort();
  for (let i = 0; i < n - 1; i++) {
    const prefix = numbers[i];
    if (prefix === numbers[i + 1].slice(0, prefix.length)) {
      return 'NO';
    }
  }
  return 'YES';
}
