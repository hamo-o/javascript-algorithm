const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 한줄 여러개
// const input = fs.readFileSync(filePath).toString().trim().split(' ');

// 여러줄
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [str, i] = input;
console.log(str[i - 1]);
