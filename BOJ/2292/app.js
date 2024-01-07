const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString();

const n = +input;

let end = 1;
let count = 1;
while (end < n) {
  end += 6 * count;
  count += 1;
}
console.log(count);
