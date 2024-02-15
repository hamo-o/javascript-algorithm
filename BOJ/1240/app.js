const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);

const graph = {};
const starts = [];

for (let i = 1; i <= n; i++) {
  graph[i] = [];
}

for (let i = 1; i < n; i++) {
  const [a, b, len] = input[i].split(' ').map(Number);
  graph[a].push([b, len]);
  graph[b].push([a, len]);
}

for (let i = n; i < n + m; i++) {
  const line = input[i].split(' ').map(Number);
  starts.push(line);
}

starts.forEach(([s, e]) => {
  const visited = new Array(n + 1).fill(-1);
  const answer = bfs(s, e, visited);
  console.log(answer);
});

function bfs(start, end, visited) {
  const queue = [];
  visited[start] = 0;
  queue.push(start);

  let front = 0;
  while (front < queue.length) {
    const cur = queue[front];
    front++;

    if (cur === end) return visited[cur];

    graph[cur].forEach(([node, len]) => {
      if (visited[node] === -1) {
        visited[node] = visited[cur] + len;
        queue.push(node);
      }
    });
  }
}
