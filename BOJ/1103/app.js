const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");

// 50*50 보드 크기
const [n, m] = input[0].split(" ").map(Number);
const board = input
  .slice(1)
  .map((line) =>
    line.split("").map((item) => (item === "H" ? "H" : Number(item)))
  );
// 동전이 구멍에 빠지거나, 보드 밖으로 나가면 게임종료
// 최대 동전을 이동할 수 있는 경우의 수는?

// 각 배열의 값으로는 해당 위치까지의 이동횟수의 최댓값을 저장
// 단, 마지막 이동 횟수까지 포함이므로 처음 지점은 1로 설정
const visited = new Array(n).fill(0).map(() => new Array(m).fill(0));
const answer = bfs(0, 0);
console.log(answer);

function bfs(sx, sy) {
  const queue = [];
  visited[sx][sy] = 1;
  queue.push([sx, sy]);

  let front = 0;
  while (front < queue.length) {
    const [x, y] = queue[front];
    front++;

    const d = board[x][y];
    const curvisit = visited[x][y];

    if (curvisit > n * m) return -1;

    [
      [-d, 0],
      [d, 0],
      [0, -d],
      [0, d],
    ].forEach(([dx, dy]) => {
      if (
        x + dx >= 0 &&
        x + dx < n &&
        y + dy >= 0 &&
        y + dy < m &&
        board[x + dx][y + dy] !== "H"
      ) {
        if (curvisit + 1 > visited[x + dx][y + dy]) {
          visited[x + dx][y + dy] = curvisit + 1;
          queue.push([x + dx, y + dy]);
        }
      }
    });
  }

  let answer = 0;
  visited.forEach((line) => {
    answer = Math.max(answer, ...line);
  });
  return answer;
}
