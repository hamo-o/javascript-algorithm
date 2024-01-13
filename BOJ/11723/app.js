const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const num = +input[0];
const commands = input.slice(1).map((line) => line.split(' '));
let bits = 0;

commands.forEach((command) => {
  const com = command[0];
  const num = command.length === 2 ? command[1] : null;

  switch (com) {
    case 'add':
      bits = bits | (1 << num);
      break;
    case 'remove':
      bits = bits & ~(1 << num);
      break;
    case 'check':
      bits & (1 << num) ? console.log(1) : console.log(0);
      break;
    case 'toggle':
      bits = bits ^ (1 << num);
      break;
    case 'all':
      bits = bits | ((1 << 21) - 1);
      break;
    case 'empty':
      bits = 0;
      break;
  }
});
