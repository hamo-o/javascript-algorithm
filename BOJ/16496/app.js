const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const nums = input[1].split(' ');

nums.sort((a, b) => b + a - (a + b));
const answer = nums[0] === '0' ? '0' : nums.join('');
console.log(answer);
