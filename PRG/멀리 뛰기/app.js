const input = 4;

const solution = (n) => {
  const memo = new Array(n + 1).fill(0);
  memo[1] = 1;
  memo[2] = 2;

  for (let i = 3; i <= n; i++) {
    memo[i] = (memo[i - 1] % 1234567) + (memo[i - 2] % 1234567);
  }

  const answer = memo[n] % 1234567;
  return answer;
};

console.log(solution(input));

// 1 | 1
// 2 | 1+1 | 2
// 3 | 1+1+1 | 2+1 | 1+2
// 4 | 1+1+1+1 | 2+1+1 | 1+2+1 | 1+1+2 | 2+2
