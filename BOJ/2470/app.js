const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const drinks = input[1].split(' ').map(Number);

drinks.sort((a, b) => a - b);

let left = 0;
let right = n - 1;
const min_abs = [Math.abs(drinks[left] + drinks[right]), 0, n - 1];
while (left < right) {
  const sum = drinks[left] + drinks[right];

  if (Math.abs(sum) === 0) {
    min_abs[0] = 0;
    min_abs[1] = left;
    min_abs[2] = right;
    break;
  }
  if (min_abs[0] > Math.abs(sum)) {
    min_abs[0] = Math.abs(sum);
    min_abs[1] = left;
    min_abs[2] = right;
  }
  if (sum < 0) {
    left++;
  } else {
    right--;
  }
}

const [sum, l, r] = min_abs;
console.log(drinks[l], drinks[r]);
