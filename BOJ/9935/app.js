const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [str, explosion] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

// 문자열 길이 100만
// 폭발문자열 길이 36
const len = explosion.length;
const answer = [];
for (const char of str) {
  answer.push(char);
  if (answer.slice(-len).join('') === explosion) {
    for (let i = 0; i < len; i++) {
      answer.pop();
    }
  }
}

console.log(answer.length ? answer.join('') : 'FRULA');
