const a = [1, 4, 2];
const b = [5, 4, 4];

function solution(A, B) {
  A.sort((a, b) => a - b);
  B.sort((a, b) => b - a);

  const answer = A.reduce((acc, cur, idx) => {
    return acc + cur * B[idx];
  }, 0);

  return answer;
}

console.log(solution(a, b));
