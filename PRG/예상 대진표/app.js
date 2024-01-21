const input = [8, 4, 6];

const calcNextNum = (num) => {
  if (num % 2) {
    return (num + 1) / 2;
  }
  return num / 2;
};

const solution = (n, a, b) => {
  let round = 1;
  let [small, big] = [a, b].sort((a, b) => a - b);

  while (big - small > 1 || big % 2) {
    small = calcNextNum(small);
    big = calcNextNum(big);
    round++;
  }

  return round;
};

console.log(solution(...input));
