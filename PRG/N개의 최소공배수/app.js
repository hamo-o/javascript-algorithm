const input = [12, 32, 45, 67, 72];

const findLCM = (mul, gcd) => {
  return mul / gcd;
};

const findGCD = (a, b) => {
  if (b === 0) {
    return a;
  } else {
    return findGCD(b, a % b);
  }
};

const solution = (arr) => {
  let lcm = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const gcd = findGCD(arr[i], lcm);
    lcm = findLCM(arr[i] * lcm, gcd);
  }

  const answer = lcm;
  return answer;
};

console.log(solution(input));
