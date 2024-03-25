const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim();
const arr = input.split('');

const stack = [];
let answer = '';
arr.forEach((item) => {
  if (item === '(') stack.push(item);
  else if (item === ')') {
    while (stack[stack.length - 1] !== '(') answer += stack.pop();
    stack.pop();
  } else if (item === '*' || item === '/') {
    while (
      stack.length &&
      stack[stack.length - 1] !== '(' &&
      stack[stack.length - 1] !== '+' &&
      stack[stack.length - 1] !== '-'
    )
      answer += stack.pop();
    stack.push(item);
  } else if (item === '+' || item === '-') {
    while (stack.length && stack[stack.length - 1] !== '(')
      answer += stack.pop();
    stack.push(item);
  }
  // 문자인 경우
  else answer += item;
});

while (stack.length) answer += stack.pop();
console.log(answer);
