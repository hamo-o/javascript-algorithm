const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split(' ');
const numberInput = input.map((num) => +num);
const state = numberInput[0] < numberInput[1];
let prev = numberInput[0];

const findSort = () => {
  for (let i = 1; i < numberInput.length; i++) {
    const cur = numberInput[i];
    if ((prev < cur && !state) || (prev > cur && state)) {
      return 'mixed';
    }
    prev = cur;
  }
  return state ? 'ascending' : 'descending';
};

const answer = findSort();
console.log(answer);
