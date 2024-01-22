const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const t = +input[0];
const tests = input.slice(1).map((line) => line.split(' ').map(Number));

const d = (num) => {
  return ['D', (num * 2) % 10000];
};

const s = (num) => {
  const new_num = num ? num - 1 : 9999;
  return ['S', new_num];
};

const l = (num) => {
  const new_num = (Math.floor(num / 1000) + 10 * num) % 10000;
  return ['L', new_num];
};

const r = (num) => {
  const new_num = 1000 * (num % 10) + Math.floor(num / 10);
  return ['R', new_num];
};

const bfs = (start, answer, visited) => {
  const queue = [];
  visited[start] = true;
  queue.push(['', start]);

  let front = 0;
  while (front < queue.length) {
    const [cur_msg, cur] = queue[front];
    front++;

    for (const [com, number] of [d(cur), s(cur), l(cur), r(cur)]) {
      if (number === answer) {
        return cur_msg + com;
      }
      if (!visited[number]) {
        visited[number] = true;
        queue.push([cur_msg + com, number]);
      }
    }
  }
};

tests.forEach((test) => {
  const visited = new Array(10000).fill(false);
  const answer = bfs(...test, visited);
  console.log(answer);
});
