function solution(numbers, target) {
  let count = 0;

  function dfs(num, depth) {
    if (depth === numbers.length) {
      if (num === target) {
        count++;
      }
      return;
    }

    [-1, 1].forEach((d) => {
      dfs(num + numbers[depth] * d, depth + 1);
    });
  }

  dfs(0, 0);
  return count;
}
