const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const t = +input[0];

let lines = 0;
for (let i = 0; i < t; i++) {
  const [n, k] = input[lines + 1].split(' ').map(Number);
  const times = input[lines + 2].split(' ').map(Number);
  const build = input
    .slice(lines + 3, lines + 3 + k)
    .map((line) => line.split(' ').map(Number));
  const w = +input[lines + k + 3];

  const graph = new Array(n + 1).fill(0).map(() => []);
  const deg = new Array(n + 1).fill(0);
  build.forEach(([s, e]) => {
    graph[s].push(e);
    deg[e]++;
  });

  const memo = top_sort(n, graph, deg, times);
  console.log(memo[w]);

  lines += k + 3;
}

function top_sort(n, graph, deg, times) {
  const queue = [];
  const memo = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    if (!deg[i]) {
      memo[i] = times[i - 1];
      queue.push(i);
    }
  }

  let front = 0;
  while (front < queue.length) {
    const cur = queue[front];
    front++;

    for (const next of graph[cur]) {
      memo[next] = Math.max(memo[next], memo[cur] + times[next - 1]);
      deg[next]--;
      if (!deg[next]) queue.push(next);
    }
  }

  return memo;
}
