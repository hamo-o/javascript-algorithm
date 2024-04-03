const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];

const graph = new Array(n + 1).fill(0).map(() => []);
const works = input.slice(1).map((line, i) => {
  const arr = line.split(' ').map(Number);
  for (let j = 2; j < 2 + arr[1]; j++) {
    graph[arr[j]].push(i + 1);
  }
  return arr.slice(0, 2);
});

const times = new Array(n + 1).fill(0);
const queue = [];
for (let i = 1; i <= n; i++) {
  if (!works[i - 1][1]) {
    times[i] = works[i - 1][0];
    queue.push(i);
  }
}

let front = 0;
while (front < queue.length) {
  const cur = queue[front];
  front++;

  for (const next of graph[cur]) {
    works[next - 1][1]--;
    times[next] = Math.max(times[next], times[cur]);

    if (!works[next - 1][1]) {
      times[next] += works[next - 1][0];
      queue.push(next);
    }
  }
}

console.log(Math.max(...times));
