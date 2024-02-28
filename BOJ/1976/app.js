const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = +input[0];
const m = +input[1];
const city = input.slice(2, -1).map((item) => item.split(' ').map(Number));
const plan = input[n + 2].split(' ').map(Number);

const parent = new Array(n).fill(0);
for (let i = 0; i < n; i++) {
  parent[i] = i;
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (city[i][j]) union(i, j);
  }
}

const answer = isTravel();
console.log(answer);

function isTravel() {
  for (let i = 0; i < m - 1; i++) {
    if (find(plan[i] - 1) !== find(plan[i + 1] - 1)) return 'NO';
  }
  return 'YES';
}

function union(a, b) {
  const root_a = find(a);
  const root_b = find(b);

  if (root_a === root_b) return;
  parent[root_a] = root_b;
}

function find(num) {
  if (parent[num] === num) return num;
  parent[num] = find(parent[num]);
  return parent[num];
}
