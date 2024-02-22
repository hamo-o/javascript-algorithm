const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m, k] = input[0].split(' ').map(Number);
const map = input.slice(1).map((line) => line.split('').map(Number));
const visited = new Array(k + 1)
  .fill(0)
  .map(() => new Array(n).fill(0).map(() => new Array(m).fill(0)));

class Node {
  constructor(x, y, count) {
    this.x = x;
    this.y = y;
    this.count = count;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }

  enqueue(x, y, count) {
    const node = new Node(x, y, count);
    if (!this.length) {
      this.front = node;
      this.rear = node;
    } else {
      this.rear.next = node;
      this.rear = node;
    }
    this.length++;
  }

  dequeue() {
    if (!this.length) return null;
    if (this.front === this.rear) this.rear = null;

    const value = [this.front.x, this.front.y, this.front.count];
    this.front = this.front.next;

    this.length--;
    return value;
  }
}

const queue = new Queue();
visited[0][0][0] = 1;
queue.enqueue(0, 0, 0);

while (queue.length) {
  const [x, y, count] = queue.dequeue();

  [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ].forEach(([dx, dy]) => {
    if (x + dx >= 0 && x + dx < n && y + dy >= 0 && y + dy < m) {
      // 벽을 부숴야 하는 경우
      if (
        map[x + dx][y + dy] &&
        count < k &&
        !visited[count + 1][x + dx][y + dy]
      ) {
        visited[count + 1][x + dx][y + dy] = visited[count][x][y] + 1;
        queue.enqueue(x + dx, y + dy, count + 1);
      }
      // 벽을 부수지 않아도 되는 경우
      else if (!map[x + dx][y + dy] && !visited[count][x + dx][y + dy]) {
        visited[count][x + dx][y + dy] = visited[count][x][y] + 1;
        queue.enqueue(x + dx, y + dy, count);
      }
    }
  });
}

let answer = Infinity;
visited.forEach((visit) => {
  if (visit[n - 1][m - 1]) answer = Math.min(answer, visit[n - 1][m - 1]);
});
console.log(answer !== Infinity ? answer : -1);
