const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const dict = {};
const n = input.length;
input.forEach((tree) => {
  dict[tree] = dict[tree] ? dict[tree] + 1 : 1;
});

const arr = [];
for (const key in dict) {
  arr.push(`${key} ${((dict[key] / n) * 100).toFixed(4)}`);
}
arr.sort();
arr.forEach((str) => console.log(str));
