const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split(' ');
const [a, b, v] = input.map((char) => +char);

const findDay = () => {
  const day = Math.ceil((v - a) / (a - b)) + 1;
  return day;
};

const answer = findDay();
console.log(answer);
