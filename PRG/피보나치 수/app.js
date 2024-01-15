const n = 100000;
const memo = new Array(n + 1).fill(0);
memo[0] = 0;
memo[1] = 1;

for (let i = 2; i <= n; i++) {
  memo[i] = (memo[i - 1] % 1234567) + (memo[i - 2] % 1234567);
}

const answer = memo[n] % 1234567;
return answer;
