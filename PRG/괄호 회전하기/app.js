const input = '}}}';

const checkIsOK = (str) => {
  const stack = [str[0]];

  for (let i = 1; i < str.length; i++) {
    const prev = stack[stack.length - 1];
    const cur = str[i];
    if (
      (prev === '[' && cur === ']') ||
      (prev === '(' && cur === ')') ||
      (prev === '{' && cur === '}')
    ) {
      stack.pop();
    } else {
      stack.push(cur);
    }
  }

  return !stack.length;
};

const solution = (s) => {
  const queue = s.split('');
  let front = 0,
    count = 0;
  for (i = 0; i < s.length; i++) {
    if (checkIsOK(queue.slice(front))) {
      count++;
    }
    queue.push(queue[front]);
    front++;
  }

  return count;
};

console.log(solution(input));
