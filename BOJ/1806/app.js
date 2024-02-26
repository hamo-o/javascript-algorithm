const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, s] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);
let left = 0;
let right = 0;
let sum = numbers[0];
let length = 1;
let min_length = Infinity;

while (left <= right && right < n) {
  if (sum >= s) {
    min_length = Math.min(min_length, length);

    sum -= numbers[left];
    left++;
    length--;
  } else {
    right++;
    if (right < n) {
      sum += numbers[right];
      length++;
    }
  }
}

console.log(min_length === Infinity ? 0 : min_length);
