const input = '1 2 3 14';

function solution(s) {
  const numbers = s.trim().split(' ');
  numbers.sort((a, b) => a - b);

  return `${numbers[0]} ${numbers[numbers.length - 1]}`;
}

console.log(solution(input));
