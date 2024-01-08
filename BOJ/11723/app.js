const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const num = +input[0];
const commands = input.slice(1).map((line) => line.split(' '));

const s = new Set();
commands.forEach((command) => {
  const [com, num] = command;
  switch (com) {
    case 'add':
      s.add(num);
      break;
    case 'remove':
      s.delete(num);
      break;
    case 'check':
      s.has(num) ? console.log(1) : console.log(0);
      break;
    case 'toggle':
      s.has(num) ? s.delete(num) : s.add(num);
      break;
    case 'all':
      s.clear();
      for (let i = 1; i < 21; i++) {
        s.add(i.toString());
      }
      break;
    case 'empty':
      s.clear();
      break;
  }
});
