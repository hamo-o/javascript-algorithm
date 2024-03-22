const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const t = +input[0];
const signals = input.slice(1);

signals.forEach((signal) => {
  const regex = /^(100+1+|01)+$/;
  const answer = regex.test(signal) ? 'YES' : 'NO';
  console.log(answer);
});
