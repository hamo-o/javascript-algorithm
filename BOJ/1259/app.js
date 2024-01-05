const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const isPalindrome = (num) => {
  const len = num.length;
  for (let i = 0; i < Math.floor(len / 2); i++) {
    if (num[i] !== num[len - 1 - i]) {
      return 'no';
    }
  }
  return 'yes';
};

for (const item of input) {
  if (item !== '0') {
    const answer = isPalindrome(item);
    console.log(answer);
  }
}
