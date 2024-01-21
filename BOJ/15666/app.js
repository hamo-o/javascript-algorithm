const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const inputs = input[1].split(' ').map(Number);
inputs.sort((a, b) => a - b);

const numbers = [...new Set(inputs)];
const len = numbers.length;

const dfs = (pick, start) => {
  if (pick.length === m) {
    console.log(pick.join(' '));
    return;
  }

  for (let i = start; i < len; i++) {
    pick.push(numbers[i]);
    dfs(pick, i);
    pick.pop();
  }
};

dfs([], 0);
