const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [s, t] = input;
const n = s.length;

function bfs() {
  const queue = [t];

  let front = 0;
  while (front < queue.length) {
    const cur = queue[front];
    front++;

    if (cur === s) return 1;

    if (cur.length - 1 >= n) {
      const a = cur.slice(0, cur.length - 1);
      const b = cur.slice(1).split('').reverse().join('');
      if (cur[cur.length - 1] === 'A') {
        queue.push(a);
      }
      if (cur[0] === 'B') {
        queue.push(b);
      }
    }
  }
  return 0;
}
const answer = bfs();
console.log(answer);
