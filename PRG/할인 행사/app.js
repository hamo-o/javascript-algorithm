const input = [
  ['banana', 'apple', 'rice', 'pork', 'pot'],
  [3, 2, 2, 2, 1],
  [
    'chicken',
    'apple',
    'apple',
    'banana',
    'rice',
    'apple',
    'pork',
    'banana',
    'pork',
    'rice',
    'pot',
    'banana',
    'apple',
    'banana',
  ],
];

const checkIsWant = (wants) => {
  for (const i in wants) {
    if (wants[i] > 0) {
      return false;
    }
  }
  return true;
};

const solution = (want, number, discount) => {
  const wants = {};
  want.forEach((item, idx) => {
    wants[item] = number[idx];
  });

  for (let i = 0; i < 10; i++) {
    const key = discount[i];
    if (key in wants) {
      wants[key]--;
    }
  }

  let count = checkIsWant({ ...wants }) ? 1 : 0;
  for (let start = 0; start + 10 < discount.length; start++) {
    discount[start] in wants && wants[discount[start]]++;
    discount[start + 10] in wants && wants[discount[start + 10]]--;
    if (checkIsWant({ ...wants })) {
      count++;
    }
  }

  return count;
};

console.log(solution(...input));
