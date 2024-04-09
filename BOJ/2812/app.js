const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);
const numbers = input[1].split('').map(Number);

const stack = [];
let num = k;
for (const number of numbers) {
  while (stack.length && num > 0 && stack[stack.length - 1] < number) {
    stack.pop();
    num--;
  }
  stack.push(number);
}
while (num > 0) {
  stack.pop();
  num--;
}

console.log(stack.join(''));
