const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);

const visited = new Array(n).fill(0);

const checkIsUp = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return 0;
    }
  }
  return 1;
};

const dfs = (arr, count) => {
  console.log(arr);
  if (checkIsUp(arr)) {
    return count;
  }

  for (let i = 0; i < n - k + 1; i++) {
    console.log(i);
    if (!visited[i]) {
      for (let j = 0; j < Math.floor(k / 2); j++) {
        [arr[i + j], arr[i + k - 1 - j]] = [arr[i + k - 1 - j], arr[i + j]];
      }
      visited[i] = 1;
      dfs(arr, count + 1);
      visited[i] = 0;
    }
  }

  return -1;
};

const answer = dfs(numbers, 0);
console.log(answer);
