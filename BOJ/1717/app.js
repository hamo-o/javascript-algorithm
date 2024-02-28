const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  solution(input);
  process.exit();
});

function solution(input) {
  const [n, m] = input[0].split(' ').map(Number);
  const parent = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    parent[i] = i;
  }
  input.slice(1).forEach((item) => {
    const [com, a, b] = item.split(' ').map(Number);
    const str = union(a, b, com);
    if (com) console.log(str);
  });
  function union(a, b, com) {
    const root_a = find(a);
    const root_b = find(b);
    if (root_a === root_b) {
      return 'YES';
    }
    if (!com) {
      parent[root_a] = root_b;
    }
    return 'NO';
  }
  function find(num) {
    if (num === parent[num]) return num;
    parent[num] = find(parent[num]);
    return parent[num];
  }
}
