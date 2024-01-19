const input = 1000000000;

function solution(n) {
  let k = 0;
  while (n > 1) {
    if (n % 2) {
      n--;
      k++;
    } else {
      n /= 2;
    }
  }
  const answer = k + 1;
  return answer;
}

console.log(solution(input));
