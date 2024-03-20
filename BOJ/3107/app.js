const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim();

const arr = input.split(':');
let cnt = 0;
arr.forEach((item) => {
  if (item) cnt++;
});

const answer = [];
let flag = true;

arr.forEach((str) => {
  if (str) {
    answer.push(str.padStart(4, '0'));
  } else if (flag) {
    for (let i = 0; i < 8 - cnt; i++) {
      answer.push('0000');
    }
    flag = false;
  }
});

console.log(answer.join(':'));
