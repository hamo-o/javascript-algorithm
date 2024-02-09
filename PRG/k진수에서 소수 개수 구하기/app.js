function checkIsDecimal(num) {
  if (num === 1) return false;

  for (let i = 2; i * i <= num; i++) {
    if (!(num % i)) {
      return false;
    }
  }
  return true;
}

function solution(n, k) {
  const str = n.toString(k);
  const nums = str.split('0');
  let count = 0;

  nums.forEach((num) => {
    if (num && checkIsDecimal(+num)) {
      count++;
    }
  });

  return count;
}
