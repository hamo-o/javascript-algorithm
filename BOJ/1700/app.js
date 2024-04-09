const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);
const names = input[1].split(' ').map(Number);

const order = new Array(k + 1).fill(0).map(() => []);
const plug = new Array(k + 1).fill(0);
let answer = 0;
let num = 0;

for (let i = k - 1; i >= 0; i--) {
  order[names[i]].push(i);
}

for (let i = 0; i < k; i++) {
  if (!plug[names[i]]) {
    num++;
  }
  if (num > n) {
    delMinCount();
    num--;
  }

  plug[names[i]] = 1;
  order[names[i]].pop();
}

console.log(answer);

function delMinCount() {
  let max_idx = 0;
  let del_idx = 0;
  for (let i = 0; i <= k; i++) {
    const arr = order[i];
    if (plug[i]) {
      if (!arr.length) {
        del_idx = i;
        break;
      }
      const last = arr[arr.length - 1];
      if (last > max_idx) {
        max_idx = last;
        del_idx = i;
      }
    }
  }
  plug[del_idx] = 0;
  answer++;
}
