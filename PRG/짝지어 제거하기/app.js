const input = 'baabaa';

function solution(s) {
  const stack = [];
  for (const char of s) {
    if (char === stack[stack.length - 1]) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }
  const answer = stack.length ? 0 : 1;
  return answer;
}

console.log(solution(input));
