const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const [k, ...truth] = input[1].split(' ').map(Number);
const party = input.slice(2).map((item) => item.split(' ').map(Number));
const check = {};

const parent = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) {
  parent[i] = i;
}

// 모든 파티들을 순회하며 사람들을 그룹으로 묶음
for (let i = 0; i < m; i++) {
  const att = party[i][0];
  for (let j = 1; j < att; j++) {
    union(party[i][j], party[i][j + 1]);
  }
}

// 진실을 알고 있는 사람들이 속한 그룹의 루트를 check 객체에 저장
truth.forEach((person) => {
  check[find(person)] = 1;
});

// 진실을 알고 있는 사람이 속해있지 않은 파티만 count
let answer = 0;
for (let i = 0; i < m; i++) {
  const att = party[i][0];
  answer += checkParty(i, att);
}
console.log(answer);

// 만약 어떤 사람의 그룹이 진실을 알고 있는 사람이 속한 그룹이면 (둘의 루트가 같으면)
// 0 return
function checkParty(i, att) {
  for (let j = 1; j <= att; j++) {
    if (check[find(party[i][j])]) {
      return 0;
    }
  }
  return 1;
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
