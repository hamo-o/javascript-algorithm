const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split(' ');

const findGCD = (a, b) => {
  const remain = a % b;
  if (!remain) {
    return b;
  }

  return findGCD(b, remain);
};

const findLCM = (a, b, c) => {
  return (a * b) / c;
};

const [s, l] = input.sort();

const gcd = findGCD(+l, +s);
const lcm = findLCM(+l, +s, gcd);
console.log(gcd);
console.log(lcm);
