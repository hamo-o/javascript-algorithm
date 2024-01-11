const input = '(())()';

const checkIsOk = (str) => {
  const stack = [];
  for (const char of str) {
    if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      if (!stack.length) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.length ? false : true;
};

const solution = (s) => {
  const answer = checkIsOk(s);
  return answer;
};

console.log(solution(input));
