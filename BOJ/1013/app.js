const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const t = +input[0];
const signals = input.slice(1);

signals.forEach((signal) => {
  const answer = check(signal);
  console.log(answer);
});

function check(signal) {
  if (signal[signal.length - 1] === '0') return 'NO';
  if (signal.length === 1) return 'NO';

  let left = 0;
  let right = 1;
  while (left < signal.length) {
    if (right >= signal.length) return 'NO';

    if (signal[left] === '1') {
      if (signal[right] === '0' && signal[++right] === '0') {
        while (signal[right] === '0') right++;
        while (signal[right] === '1' && right < signal.length) {
          if (
            right + 3 < signal.length &&
            signal[right + 1] === '1' &&
            signal[right + 2] === '0' &&
            signal[right + 3] === '0'
          ) {
            right++;
            break;
          }
          right++;
        }
        left = right;
        right = left + 1;
      } else return 'NO';
    } else if (signal[left] === '0') {
      if (signal[right] === '1') {
        left = right + 1;
        right = left + 1;
      } else return 'NO';
    }
  }
  return 'YES';
}
