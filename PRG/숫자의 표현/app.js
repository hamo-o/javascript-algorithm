const input = 15;

function solution(n) {
  let answer = 0;
  let right = 2;
  let sum = 3;

  for (let left = 1; left < n; left++) {
    while (sum <= n && left < right) {
      if (sum === n) {
        answer++;
        break;
      }
      right++;
      sum += right;
    }
    sum -= left;
  }
  return answer + 1;
}

console.log(solution(input));
