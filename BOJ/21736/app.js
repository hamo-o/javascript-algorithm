const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const [size, ...input] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
const [n, m] = size.split(' ').map(Number);
const campus = input.map((line) => line.split(''));
const visited = new Array(n).fill(0).map(() => new Array(m).fill(0));

const findI = () => {
  for (const i in campus) {
    for (const j in campus[i]) {
      if (campus[i][j] === 'I') {
        return [+j, +i];
      }
    }
  }
};

const bfs = (start) => {
  const queue = [];
  let meet = 0;

  const [x, y] = start;
  visited[y][x] = 1;
  queue.push(start);

  const d = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let front = 0;
  while (front < queue.length) {
    const [x, y] = queue[front];
    front += 1;

    d.forEach((item) => {
      const [dx, dy] = item;
      if (
        x + dx >= 0 &&
        x + dx < m &&
        y + dy >= 0 &&
        y + dy < n &&
        campus[y + dy][x + dx] !== 'X'
      ) {
        if (!visited[y + dy][x + dx]) {
          visited[y + dy][x + dx] = 1;
          queue.push([x + dx, y + dy]);
          if (campus[y + dy][x + dx] === 'P') {
            meet++;
          }
        }
      }
    });
  }

  return meet;
};

const start = findI();
const meet = bfs(start);
meet ? console.log(meet) : console.log('TT');
