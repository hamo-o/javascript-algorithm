const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, c] = input[0].split(' ').map(Number);
const houses = input.slice(1).map(Number);
houses.sort((a, b) => a - b);

let left = 1;
let right = houses[n - 1] - houses[0];
while (left <= right) {
  const mid = Math.ceil((left + right) / 2);
  if (left === right) {
    console.log(mid);
    break;
  }

  let i = 0;
  let j = 1;
  let count = 1;
  while (j < n) {
    if (houses[j] - houses[i] >= mid) {
      count++;
      i = j;
    }
    j++;
  }

  if (count < c) {
    right = mid - 1;
  } else {
    left = mid;
  }
}
