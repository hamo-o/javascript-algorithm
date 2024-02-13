const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const t = +input[0];
const calendar = input.slice(1);

const findDate = (m, n, x, y) => {
  let k = x;
  while (k <= m * n) {
    if ((k - x) % m === 0 && (k - y) % n === 0) {
      return k;
    }
    k += m;
  }
  return -1;
};

calendar.forEach((date) => {
  [m, n, x, y] = date.split(' ').map(Number);
  const answer = findDate(m, n, x, y);
  console.log(answer);
});

// m=10 n=12
// 1:1
// 2:2
// 3:3
// 4:4
// 5:5
// 6:6
// 7:7
// 8:8
// 9:9
// 10:10
// 1:11
// 2:12
// 3:1
// 4:2
// 5:3
// 6:4
// 7:5
// 8:6
// 9:7
// 10:8
// 1:9
// 2:10
// 3:11
// 4:12
// 5:1
// 6:2
// 7:3
// 8:4
// 9:5
// 10:6
// 1:7
// 2:8
// 3:9
