const input = [
  ['yellow_hat', 'headgear'],
  ['blue_sunglasses', 'eyewear'],
  ['green_turban', 'headgear'],
];

const solution = (clothes) => {
  const fashion = {};
  clothes.forEach((cloth) => {
    fashion[cloth[1]] = cloth[1] in fashion ? fashion[cloth[1]] + 1 : 2;
  });

  let mul = 1;
  for (const key in fashion) {
    mul *= fashion[key];
  }

  return mul - 1;
};

console.log(solution(input));
