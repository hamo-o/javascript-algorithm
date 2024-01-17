const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const t = +input[0];
const tests = input.slice(1);

const changeArr = (cmd, len, arr_true, arr_false) => {
  let first = 0;
  let last = 0;
  let flag = true;

  for (const char of cmd) {
    if (char === 'R') {
      flag = !flag;
    } else {
      if (first + last >= len) {
        return 'error';
      }
      flag ? first++ : last++;
    }
  }

  const result = flag
    ? arr_true.slice(first, len - last)
    : arr_false.slice(last, len - first);
  return '[' + result + ']';
};

for (let i = 0; i < t; i++) {
  const cmd = tests[i * 3];
  const len = +tests[i * 3 + 1];
  const arr = len
    ? tests[i * 3 + 2]
        .substr(1, tests[i * 3 + 2].length - 2)
        .split(',')
        .map(Number)
    : [];

  const answer = changeArr(cmd, len, arr, [...arr].reverse());
  console.log(answer);
}
