const input = 78;

function solution(n) {
  const len = n.toString(2).split('0').join('').length;

  for (let num = n + 1; num <= 1000000; num++) {
    const cur_len = num.toString(2).split('0').join('').length;
    if (cur_len === len) {
      return num;
    }
  }
}

console.log(solution(input));
