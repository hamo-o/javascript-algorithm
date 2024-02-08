const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
let table = '';
input.forEach((line) => (table += line.split(' ').join('')));

const visited = {};
const answer = '123456780';

function swap(str, a, b) {
  const arr = str.split('');
  [arr[a], arr[b]] = [arr[b], arr[a]];
  const nextStr = arr.join('');

  return nextStr;
}

function bfs(start) {
  const queue = [];
  visited[start] = 0;
  queue.push(start);

  let front = 0;
  while (front < queue.length) {
    const str = queue[front];
    const count = visited[str];
    front++;

    if (str === answer) {
      return count;
    }

    const zeroIndex = str.indexOf('0');
    const x = Math.floor(zeroIndex / 3);
    const y = zeroIndex % 3;

    [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ].forEach((item) => {
      const [dx, dy] = item;
      const nx = x + dx;
      const ny = y + dy;
      const nextIndex = 3 * nx + ny;

      if (nx >= 0 && nx < 3 && ny >= 0 && ny < 3) {
        const nextStr = swap(str, zeroIndex, nextIndex);
        if (!(nextStr in visited)) {
          visited[nextStr] = count + 1;
          queue.push(nextStr);
        }
      }
    });
  }
  return -1;
}

console.log(bfs(table));
