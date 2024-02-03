function solution(progresses, speeds) {
  const answer = [];
  let stack = [];
  progresses.forEach((progress, i) => {
    const day = Math.ceil((100 - progress) / speeds[i]);
    if (stack.length && stack[0] < day) {
      answer.push(stack.length);
      stack = [];
    }
    stack.push(day);
  });
  answer.push(stack.length);
  return answer;
}
