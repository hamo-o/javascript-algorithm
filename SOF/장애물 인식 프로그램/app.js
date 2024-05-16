const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line.trim());
}).on("close", () => {
  const n = +lines[0];
  const map = lines.slice(1).map((line) => line.split("").map(Number));
  const visited = new Array(n).fill(0).map(() => new Array(n).fill(0));

  const answer = [];
  let num = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j] && map[i][j]) {
        num++;
        const result = bfs(i, j);
        answer.push(result);
      }
    }
  }

  answer.sort((a, b) => a - b);

  console.log(num);
  answer.forEach((count) => {
    console.log(count);
  });

  function bfs(sx, sy) {
    const queue = [];
    visited[sx][sy] = 1;
    queue.push([sx, sy]);

    let front = 0;
    let result = 1;
    while (front < queue.length) {
      const [x, y] = queue[front];
      front++;

      [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ].forEach(([dx, dy]) => {
        if (
          x + dx >= 0 &&
          x + dx < n &&
          y + dy >= 0 &&
          y + dy < n &&
          !visited[x + dx][y + dy] &&
          map[x + dx][y + dy]
        ) {
          visited[x + dx][y + dy] = 1;
          queue.push([x + dx, y + dy]);
          result++;
        }
      });
    }
    return result;
  }
  process.exit();
});
