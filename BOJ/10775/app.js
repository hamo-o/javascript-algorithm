const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const g = +input[0];
const p = +input[1];
const infos = input.slice(2).map(Number);

// parent[x] = k
// 1~k는 1~x에서 도킹하지 않은 게이트 번호
const parent = new Array(g + 1).fill(0).map((_, i) => i);
const visited = new Array(g + 1).fill(0);
visited[0] = 1;

let answer = 0;
for (const info of infos) {
  if (visited[find(info)]) break;
  visited[parent[info]] = 1;
  union(parent[info] - 1, parent[info]);
  answer++;
}
console.log(answer);

function union(a, b) {
  const parent_a = find(a);
  const parent_b = find(b);

  if (parent_a === parent_b) return;
  parent[parent_b] = parent_a;
}

function find(x) {
  if (parent[x] === x) return x;
  parent[x] = find(parent[x]);
  return parent[x];
}
