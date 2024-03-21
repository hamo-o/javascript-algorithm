const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const wheels = input.slice(0, 4).map((line) => line.split('').map(Number));
const k = +input[4];
const spins = input.slice(5).map((line) => line.split(' ').map(Number));

spins.forEach(([num, dir]) => {
  const graph = new Array(4).fill(0).map(() => []);
  const visited = new Array(4).fill(0);

  for (let i = 0; i < 3; i++) {
    if (wheels[i][2] !== wheels[i + 1][6]) {
      graph[i].push(i + 1);
      graph[i + 1].push(i);
    }
  }

  const queue = [];
  visited[num - 1] = 1;
  queue.push([num - 1, dir]);

  let front = 0;
  while (front < queue.length) {
    const [cur, d] = queue[front];
    front++;

    for (const next of graph[cur]) {
      if (!visited[next]) {
        visited[next] = 1;
        queue.push([next, d * -1]);
      }
    }
  }
  queue.forEach((item) => spinWheel(...item));
});

let answer = 0;
wheels.forEach((wheel, i) => {
  if (wheel[0]) {
    answer += 2 ** i;
  }
});
console.log(answer);

function spinWheel(num, dir) {
  if (dir === 1) {
    const last = wheels[num].pop();
    wheels[num] = [last, ...wheels[num]];
  } else {
    const first = wheels[num].shift();
    wheels[num].push(first);
  }
}
