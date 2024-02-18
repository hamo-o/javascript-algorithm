const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const drinks = input[1].split(' ').map(Number);

drinks.sort((a, b) => a - b);

function findDrinks() {
  const min_abs = [Infinity, 0, 0, 0];

  for (let left = 0; left < n; left++) {
    let mid = left + 1;
    let right = n - 1;

    while (mid < right) {
      const sum = drinks[left] + drinks[mid] + drinks[right];

      if (sum === 0) {
        min_abs[0] = 0;
        min_abs[1] = left;
        min_abs[2] = mid;
        min_abs[3] = right;
        return min_abs;
      }
      if (min_abs[0] > Math.abs(sum)) {
        min_abs[0] = Math.abs(sum);
        min_abs[1] = left;
        min_abs[2] = mid;
        min_abs[3] = right;
      }
      if (sum < 0) {
        mid++;
      } else {
        right--;
      }
    }
  }
  return min_abs;
}

const [sum, l, m, r] = findDrinks();
console.log(drinks[l], drinks[m], drinks[r]);
