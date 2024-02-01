const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const str = input[0];
const n = +input[1];
const commands = input.slice(2).map((item) => item.split(' '));

const cursor_left = str.split('');
const cursor_right = [];

commands.forEach((command) => {
  const c = command[0];

  if (c === 'L') {
    if (cursor_left.length) {
      const top = cursor_left.pop();
      cursor_right.push(top);
    }
  } else if (c === 'D') {
    if (cursor_right.length) {
      const bottom = cursor_right.pop();
      cursor_left.push(bottom);
    }
  } else if (c === 'B') {
    if (cursor_left.length) {
      cursor_left.pop();
    }
  } else {
    const v = command[1];
    cursor_left.push(v);
  }
});

const answer = cursor_left.join('') + cursor_right.reverse().join('');
console.log(answer);
