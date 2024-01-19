const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const info = input.slice(1).map((item) => item.split(' ').map(Number));
const visited = new Array(101).fill(0);

const graph = {};
for (let i = 0; i < n + m; i++) {
  const [start, end] = info[i];
  graph[start] = end;
}

const bfs = (start) => {
  const queue = [];
  queue.push(start);

  let first = 0;
  while (first < queue.length) {
    const cur = queue[first];
    first++;

    for (let d = 1; d <= 6; d++) {
      if (cur + d <= 100) {
        const item = graph[cur + d];
        if (item) {
          visited[cur + d] = visited[cur] + 1;
          if (!visited[item] || visited[item] > visited[cur + d]) {
            visited[item] = visited[cur + d];
            queue.push(item);
          }
        } else if (!visited[cur + d]) {
          visited[cur + d] = visited[cur] + 1;
          queue.push(cur + d);
        }
      }
    }
  }
};

bfs(1);
console.log(visited[100]);
