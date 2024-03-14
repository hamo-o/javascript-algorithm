const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const stack = [];
const depth = new Array(15).fill(0);
for (const char of input[0]) {
  if (!stack.length) {
    stack.push(char);
  } else if (stack[stack.length - 1] === '(' && char === ')') {
    stack.pop();
    let temp = 0;
    for (let i = stack.length + 1; i < 15; i++) {
      if (depth[i]) {
        temp += depth[i];
        depth[i] = 0;
      }
    }
    depth[stack.length] = temp
      ? depth[stack.length] + 2 * temp
      : depth[stack.length] + 2;
  } else if (stack[stack.length - 1] === '[' && char === ']') {
    stack.pop();
    let temp = 0;
    for (let i = stack.length + 1; i < 15; i++) {
      if (depth[i]) {
        temp += depth[i];
        depth[i] = 0;
      }
    }
    depth[stack.length] = temp
      ? depth[stack.length] + 3 * temp
      : depth[stack.length] + 3;
  } else {
    stack.push(char);
  }
}

stack.length ? console.log(0) : console.log(depth[0]);
