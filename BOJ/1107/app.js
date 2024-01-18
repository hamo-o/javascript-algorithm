const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const target = input[0];
const broken_num = +input[1];
const broken = broken_num ? input[2].split(' ').map(Number) : [];

const buttons = new Array(10).fill(true).map((_, idx) => {
  return broken.includes(idx) ? false : true;
});

const checkButton = (numbers) => {
  for (const number of numbers) {
    if (!buttons[number]) {
      return false;
    }
  }
  return true;
};

let answer = Math.abs(100 - +target);
for (let cur = 0; cur < 1000000; cur++) {
  const curStr = cur.toString();
  if (checkButton(curStr)) {
    answer = Math.min(answer, Math.abs(target - cur) + curStr.length);
  }
}

console.log(answer);
