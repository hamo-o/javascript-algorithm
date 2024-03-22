const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const t = +input[0];
const strs = input.slice(1);

// 문자열 최대 30개, 길이 최대 10만

strs.forEach((str) => {
  let cnt = 0;
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] === str[right]) {
      left++;
      right--;
    } else {
      cnt = Math.min(
        checkIsSP(str, left, right - 1),
        checkIsSP(str, left + 1, right)
      );
      break;
    }
  }

  console.log(cnt);
});

function checkIsSP(str, left, right) {
  while (left < right) {
    if (str[left] === str[right]) {
      left++;
      right--;
    } else {
      return 2;
    }
  }
  return 1;
}
