const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = +input[0];
const k = +input[1];
const apples = input.slice(2, 2 + k);
const l = +input[2 + k];
const dirArr = input.slice(3 + k, 3 + k + l).map((line) => line.split(' '));
const directions = {};
dirArr.forEach((item) => {
  directions[item[0]] = item[1];
});

const queue = ['1 1'];
let tail = 0;
let time = 0;
const d = [0, 1];

while (true) {
  const head = queue[queue.length - 1];
  const [x, y] = head.split(' ').map(Number);

  if (directions[time] === 'L') {
    // 1 0 > 0 1
    // -1 0 > 0 -1
    // 0 1 > -1 0
    // 0 -1 > 1 0
    [d[0], d[1]] = d[0] ? [d[1], d[0]] : [-d[1], -d[0]];
  } else if (directions[time] === 'D') {
    // 1 0 > 0 -1
    // -1 0 > 0 1
    // 0 1 > 1 0
    // 0 -1 > -1 0
    [d[0], d[1]] = d[0] ? [-d[1], -d[0]] : [d[1], d[0]];
  }

  const [dx, dy] = d;
  if (
    x + dx > 0 &&
    x + dx <= n &&
    y + dy > 0 &&
    y + dy <= n &&
    !queue.slice(tail).includes(`${x + dx} ${y + dy}`)
  ) {
    queue.push(`${x + dx} ${y + dy}`);
    const idx = apples.indexOf(`${x + dx} ${y + dy}`);
    // 사과가 있다면
    if (idx !== -1) {
      apples.splice(idx, 1);
    }
    // 사과가 없다면
    else {
      tail++;
    }
  } else {
    break;
  }

  time++;
}

console.log(time + 1);
