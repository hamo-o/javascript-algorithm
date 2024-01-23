const input = [8, 4, 6];

const solution = (n, a, b) => {
  let round = 0;

  while (a !== b) {
    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
    round++;
  }

  return round;
};

console.log(solution(...input));
