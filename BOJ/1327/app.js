const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

const answer = [...numbers].sort((a, b) => a - b).join('');
const visited = {};

const bfs = (start) => {
  const queue = [];
  queue.push(start);
  visited[start[1]] = 1;

  let front = 0;
  while (front < queue.length) {
    const cur = queue[front];
    const [count, str] = cur;
    front++;

    if (answer === str) {
      return count;
    }

    for (let i = 0; i < n - k + 1; i++) {
      const arr = str.split('');
      for (let j = 0; j < Math.floor(k / 2); j++) {
        [arr[i + j], arr[i + k - 1 - j]] = [arr[i + k - 1 - j], arr[i + j]];
      }
      const swap = arr.join('');
      if (!visited[swap]) {
        visited[swap] = 1;
        queue.push([count + 1, swap]);
      }
    }
  }
  return -1;
};

console.log(bfs([0, numbers.join('')]));
