const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const t = +input[0];
const n = +input[1];
const a = input[2].split(' ').map(Number);
const m = +input[3];
const b = input[4].split(' ').map(Number);

const asums = [];
const bsums = [];
for (let i = 0; i < n; i++) {
  let asum = 0;
  for (let j = i; j < n; j++) {
    asum += a[j];
    asums.push(asum);
  }
}
for (let i = 0; i < m; i++) {
  let bsum = 0;
  for (let j = i; j < m; j++) {
    bsum += b[j];
    bsums.push(bsum);
  }
}

asums.sort((a, b) => a - b);
bsums.sort((a, b) => a - b);

let count = 0;
const visited = {};
for (let i = 0; i < asums.length; i++) {
  let left = 0;
  let right = bsums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (asums[i] + bsums[mid] === t) {
      if (!visited[mid]) {
        let l = mid;
        let r = mid;
        while (
          (l >= 0 && bsums[l] === bsums[mid]) ||
          (r < bsums.length && bsums[r] === bsums[mid])
        ) {
          if (l >= 0 && bsums[l] === bsums[mid]) l--;
          if (r < bsums.length && bsums[r] === bsums[mid]) r++;
        }
        visited[mid] = r - l - 1;
      }
      count += visited[mid];
      break;
    } else if (asums[i] + bsums[mid] > t) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
}

console.log(count);
