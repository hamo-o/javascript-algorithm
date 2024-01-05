const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const [n, input] = fs.readFileSync(filePath).toString().trim().split('\n');

const isDecimal = (num) => {
  if (num === 1) {
    return false;
  }
  for (let i = 2; i * i <= num; i++) {
    if (!(num % i)) {
      return false;
    }
  }
  return true;
};

const answer = input.split(' ').reduce((acc, cur) => {
  return isDecimal(+cur) ? acc + 1 : acc;
}, 0);
console.log(answer);
