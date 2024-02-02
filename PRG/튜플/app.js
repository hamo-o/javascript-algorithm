const input = '{{2},{2,1},{2,1,3},{2,1,3,4}}';

const solution = (s) => {
  const arr = s.slice(2, -2).split('},{');
  const sets = arr.map((item) => item.split(',').map(Number));
  sets.sort((a, b) => a.length - b.length);

  const answer = new Set();
  sets.forEach((set) => {
    set.forEach((item) => {
      answer.add(item);
    });
  });

  return [...answer];
};

console.log(solution(input));
