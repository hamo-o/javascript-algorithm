function checkIsP(cur, queue) {
  for (let i = 0; i < queue.length; i++) {
    if (cur < queue[i][0]) {
      return 0;
    }
  }
  return 1;
}

function solution(priorities, location) {
  const queue = priorities.map((item, i) => [item, i]);

  let count = 0;
  while (queue.length) {
    const cur = queue.shift();
    if (checkIsP(cur[0], queue)) {
      count++;
      if (cur[1] === location) {
        return count;
      }
    } else {
      queue.push(cur);
    }
  }
}
