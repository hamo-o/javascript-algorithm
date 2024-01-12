const input = '1111111';

function solution(s) {
  let str = s;
  let zero = 0;
  let count = 0;

  while (str !== '1') {
    const arr = str.split('');
    const len = arr.length;

    const one_len = arr.filter((item) => item === '1').length;
    str = one_len.toString(2);

    zero += len - one_len;
    count++;
  }
  return [count, zero];
}

console.log(solution(input));
