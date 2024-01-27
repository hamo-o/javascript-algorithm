const input = [10000000, 99999999999, 99999999999];

const solution = (n, left, right) => {
  const arr = {};

  for (let i = left; i <= right; i++) {
    arr[i] = Math.max(Math.floor(i / n) + 1, (i % n) + 1);
  }
  return Object.values(arr);
};
console.log(solution(...input));
