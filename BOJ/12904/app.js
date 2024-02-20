const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [s, t] = input;

const arr = t.split('');
let len = arr.length;

while (len > s.length) {
  if (arr[len - 1] === 'A') {
    arr.pop();
  } else {
    arr.pop();
    arr.reverse();
  }
  len--;
}

const answer = arr.join('') === s ? 1 : 0;
console.log(answer);
