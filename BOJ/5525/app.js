const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const [n, m, input] = fs.readFileSync(filePath).toString().trim().split('\n');
const str = input.split('');

let count = 0;
let left = 0;
let right = 1;
const d = 2 * +n + 1;
while (right < +m) {
  if (str[left] === 'O') {
    left++;
  } else {
    right = left;
    while (right < +m - 1 && str[right] !== str[right + 1]) {
      right++;
    }
    if (str[right] === 'O') {
      right--;
    }
    const len = right - left + 1;
    if (len - d >= 0) {
      count += 1 + (len - d) / 2;
    }

    left = right + 1;
  }
}

console.log(count);
