const input = 'Hi my Name is   Wish';

function solution(s) {
  const strings = s.split(' ');
  const jardenStr = strings.map((str) => {
    return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : '';
  });

  const answer = jardenStr.join(' ');
  return answer;
}

console.log(solution(input));
