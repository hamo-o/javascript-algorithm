const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const numbers = input[1].split(' ').map(Number);

const arr = [numbers[0]];
for (let i = 1; i < n; i++) {
  const m = arr.length;

  if (arr[m - 1] < numbers[i]) {
    arr.push(numbers[i]);
  } else {
    let left = 0;
    let right = m - 1;
    let mid = 0;
    while (left <= right) {
      mid = Math.floor((left + right) / 2);

      if (left === right || arr[mid] === numbers[i]) break;

      if (arr[mid] < numbers[i]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    arr[mid] = numbers[i];
  }
}

console.log(arr.length);
