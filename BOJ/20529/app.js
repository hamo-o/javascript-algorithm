const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const t = +input[0];
const tests = input.slice(1);

const calcDist = (a, b, c) => {
  let count = 0;
  for (let i = 0; i < 4; i++) {
    if (a[i] !== b[i]) {
      count += 1;
    }
    if (a[i] !== c[i]) {
      count += 1;
    }
    if (b[i] !== c[i]) {
      count += 1;
    }
  }
  return count;
};

const dfs = (arr, pick, start, cnt) => {
  if (pick.length === 3) {
    return calcDist(...pick);
  }

  for (let i = start; i < arr.length; i++) {
    pick.push(arr[i]);

    const dist = dfs(arr, pick, start + 1, cnt);
    cnt = Math.min(dist, cnt);

    pick.pop();
    start = i + 1;
  }

  return cnt;
};

let idx = 0;
while (idx < t * 2) {
  const num = +tests[idx];
  const mbtis = tests[idx + 1].split(' ');

  const answer = num > 32 ? 0 : dfs(mbtis, [], 0, Infinity);
  console.log(answer);

  idx += 2;
}
