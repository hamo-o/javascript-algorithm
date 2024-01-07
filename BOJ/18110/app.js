const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const len = +input[0];
const exclude = Math.round(len * 0.15);

const calcGrade = () => {
  const grade = input.slice(1).map((num) => +num);
  grade.sort((a, b) => a - b);

  const filteredGrade = grade.slice(exclude, len - exclude);

  const sum = filteredGrade.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  return Math.round(sum / (len - exclude * 2));
};

const answer = len ? calcGrade() : 0;
console.log(answer);
