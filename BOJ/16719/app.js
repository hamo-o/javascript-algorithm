const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim();
const answer = new Array(input.length).fill('');
pick(input, 0);

function pick(str, start) {
  if (!str) return;

  const arr = str
    .split('')
    .map((item, i) => [item, i])
    .sort((a, b) => a[0].charCodeAt() - b[0].charCodeAt());
  const [char, i] = arr[0];
  answer[start + i] = char;

  const left = str.slice(0, i);
  const right = str.slice(i + 1);

  console.log(answer.join(''));

  pick(right, start + i + 1);
  pick(left, start);
}
