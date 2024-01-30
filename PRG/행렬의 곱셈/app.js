const input = [
  [
    [1, 4],
    [3, 2],
    [4, 1],
  ],
  [
    [3, 3],
    [3, 3],
  ],
];

const solution = (arr1, arr2) => {
  const column = arr1.length;
  const row = arr2[0].length;
  const mul = arr2.length;
  const answer = new Array(column).fill(0).map(() => new Array(row).fill(0));

  for (let i = 0; i < column; i++) {
    for (let j = 0; j < row; j++) {
      for (let k = 0; k < mul; k++) {
        answer[i][j] += arr1[i][k] * arr2[k][j];
      }
    }
  }

  return answer;
};
console.log(solution(...input));

// 행렬의 곱 arr1 * arr2
// 1행 1열 -> arr1의 1행과 arr2의 1열의 원소를 각각 곱하고 더한 값
