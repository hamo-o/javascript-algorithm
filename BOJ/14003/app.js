const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const numbers = input[1].split(' ').map(Number);
const arr = [numbers[0]];
const memo = new Array(n).fill(0);

for (let i = 1; i < n; i++) {
  let left = 0;
  let right = arr.length - 1;
  if (arr[right] < numbers[i]) {
    arr.push(numbers[i]);
    memo[i] = arr.length - 1;
  } else {
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (left === right || arr[mid] === numbers[i]) {
        memo[i] = mid;
        arr[mid] = numbers[i];
        break;
      }

      if (arr[mid] < numbers[i]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
  }
}

let idx = arr.length - 1;
for (let i = n - 1; i >= 0; i--) {
  if (memo[i] === idx) {
    arr[idx] = numbers[i];
    idx--;
  }
}

console.log(arr.length);
console.log(arr.join(' '));
