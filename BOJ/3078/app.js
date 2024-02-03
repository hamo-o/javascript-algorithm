const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);
const names = input.slice(1);

const counts = new Array(21).fill(0);
for (let i = 0; i <= k; i++) {
  counts[names[i].length]++;
}

let friend = counts.reduce((acc, cur) => {
  return cur > 1 ? acc + (cur * (cur - 1)) / 2 : acc;
}, 0);

let start = 0;
while (start + k + 1 < n) {
  const next = names[start + k + 1].length;

  counts[names[start].length]--;
  counts[next]++;

  if (counts[next] > 1) {
    friend += counts[next] - 1;
  }

  start++;
}

console.log(friend);
