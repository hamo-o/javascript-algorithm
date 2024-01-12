const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const friends = input.slice(1).map((line) => line.split(' ').map(Number));

const graph = {};
for (let i = 1; i <= n; i++) {
  graph[i] = new Set();
}

friends.forEach((friend) => {
  const [a, b] = friend;
  graph[a].add(b);
  graph[b].add(a);
});

const bfs = (start, visited) => {
  const queue = [];
  visited[start] = 1;
  queue.push(start);

  let front = 0;
  while (front < queue.length) {
    const cur = queue[front];
    front++;

    for (const friend of graph[cur]) {
      if (!visited[friend]) {
        visited[friend] += visited[cur] + 1;
        queue.push(friend);
      }
    }
  }

  const sum = visited.reduce((acc, cur) => {
    return acc + cur - 1;
  }, 1);

  return sum;
};

let min = Infinity;
let answer = 0;
for (let i = 1; i <= n; i++) {
  const visited = new Array(n + 1).fill(0);
  const num = bfs(i, visited);

  if (num < min) {
    answer = i;
    min = num;
  }
}

console.log(answer);
