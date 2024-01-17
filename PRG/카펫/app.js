const input = [18, 6];

function solution(brown, yellow) {
  const grids = brown + yellow;

  let row = 3;
  for (let i = 3; i * i <= grids; i++) {
    if (!(grids % i) && (grids / i - 2) * (i - 2) === yellow) {
      row = i;
    }
  }

  const answer = [grids / row, row];
  return answer;
}

console.log(solution(...input));
