const input = [
  'Jeju',
  'Pangyo',
  'Seoul',
  'Jeju',
  'Pangyo',
  'Seoul',
  'Jeju',
  'Pangyo',
  'Seoul',
];

const solution = (cacheSize, cities) => {
  let answer = 0;
  const cache = [];

  for (let i = 0; i < cities.length; i++) {
    const cur = cities[i].toUpperCase();
    const idx = cache.indexOf(cur);
    // cache hit
    if (idx !== -1) {
      answer += 1;
      if (cache.length >= cacheSize) {
        cache.splice(idx, 1);
      }
    }
    // cache miss
    else {
      answer += 5;
      if (cache.length >= cacheSize) {
        cache.splice(0, 1);
      }
    }

    if (cache.length < cacheSize) {
      cache.push(cur);
    }
  }

  return answer;
};

console.log(solution(input));
