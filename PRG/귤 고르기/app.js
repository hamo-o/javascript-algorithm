const input = [1, 3, 2, 5, 4, 5, 2, 3];

const solution = (k, tangerine) => {
  const items = {};
  tangerine.forEach((tang) => {
    items[tang] = items[tang] ? items[tang] + 1 : 1;
  });

  const sorted = Object.entries(items).sort((a, b) => b[1] - a[1]);

  let sum = 0;
  let count = 0;
  while (count < sorted.length) {
    if (sum >= k) {
      break;
    } else if (sum < k) {
      sum += sorted[count][1];
      count++;
    }
  }

  return count;
};

console.log(solution(6, input));
