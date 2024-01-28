const input = [3, 0, 6, 1, 5];

const solution = (citations) => {
  for (let i = 10000; i >= 0; i--) {
    let count = 0;
    for (const citation of citations) {
      if (citation >= i) {
        count++;
      }
    }
    if (count >= i) {
      return i;
    }
  }
};
console.log(solution(input));

// 배열길이 1000 이하
// 원소 10000 이하
