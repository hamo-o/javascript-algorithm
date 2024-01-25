const input = [7, 9, 1, 1, 4];

const solution = (elements) => {
  const n = elements.length;
  memo = new Array(n + 1).fill(0).map(() => []);
  memo[1] = [...elements];

  // 연속 부분 수열의 길이
  for (i = 2; i <= n; i++) {
    // 기준점의 인덱스
    for (j = 0; j < n; j++) {
      const new_sum = memo[i - 1][j] + elements[(j + i - 1) % n];
      memo[i].push(new_sum);
    }
  }

  const answer = new Set();
  memo.forEach((line) => {
    line.forEach((item) => {
      answer.add(item);
    });
  });

  return answer.size;
};

console.log(solution(input));
