const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const num = +input[0];
const grid = input.slice(1);

const graph = {};
for (let i = 1; i <= num; i++) {
  graph[i] = [];
}

grid.forEach((line, idx) => {
  graph[idx + 1] = line
    .split(' ')
    .map((item, i) => {
      return +item ? i + 1 : false;
    })
    .filter(Boolean);
});

const bfs = (start, visited) => {
  const queue = [];
  queue.push(start);

  let front = 0;
  while (front < queue.length) {
    const cur = queue[front];
    front++;

    for (const item of graph[cur]) {
      if (!visited[item]) {
        visited[item] = 1;
        queue.push(item);
      }
    }
  }

  const answer = visited.slice(1).join(' ');
  console.log(answer);
};

for (let start = 1; start <= num; start++) {
  bfs(start, new Array(num + 1).fill(0));
}
