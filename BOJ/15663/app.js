const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);
const answers = new Set();
const visited = new Array(n).fill(false);

numbers.sort((a, b) => a - b);

const dfs = (pick) => {
  if (pick.length === m) {
    answers.add(pick.join(' '));
  }
  numbers.forEach((number, i) => {
    if (!visited[i]) {
      pick.push(number);
      visited[i] = true;

      dfs(pick);

      pick.pop();
      visited[i] = false;
    }
  });
};

dfs([]);
answers.forEach((answer) => {
  console.log(answer);
});
