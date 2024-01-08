const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);

const nameArr = input.slice(1, n + 1);
const names = {};
nameArr.forEach((name, idx) => {
  names[name] = idx + 1;
});
const questions = input.slice(n + 1);

const regex = /^[1-9]/;
for (const question of questions) {
  if (regex.test(question)) {
    console.log(nameArr[question - 1]);
  } else {
    console.log(names[question]);
  }
}
