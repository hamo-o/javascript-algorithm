const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim();
const bucket = input.split(' ').map(Number);
const visited = new Array(bucket[0] + 1)
  .fill(0)
  .map(() =>
    new Array(bucket[1] + 1).fill(0).map(() => new Array(bucket[2] + 1).fill(0))
  );
const set = new Set();

const dfs = (pick) => {
  if (pick[0] === 0) {
    set.add(pick[2]);
  }

  [
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 2],
    [2, 0],
    [2, 1],
  ].forEach((item) => {
    const [from, to] = item;
    const water = Math.min(pick[from], bucket[to] - pick[to]);
    if (water && pick[to] + water <= bucket[to] && pick[from] - water >= 0) {
      pick[to] += water;
      pick[from] -= water;
      if (!visited[pick[0]][pick[1]][pick[2]]) {
        visited[pick[0]][pick[1]][pick[2]] = 1;
        dfs(pick);
        visited[pick[0]][pick[1]][pick[2]] = 0;
      }
      pick[to] -= water;
      pick[from] += water;
    }
  });
};

dfs([0, 0, bucket[2]]);
const arr = [...set].sort((a, b) => a - b);
console.log(arr.join(' '));
