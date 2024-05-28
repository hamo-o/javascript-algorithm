const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const n = BigInt(input[0]);

const ZERO = BigInt(0);
const ONE = BigInt(1);
const TWO = BigInt(2);
const DIV = BigInt(1000000007);
const dict = {};

const answer = fibo(n) % DIV;
console.log(Number(answer));

function fibo(k) {
  if (k === ZERO) return ZERO;
  if (k === ONE) return ONE;
  if (k === TWO) return ONE;

  // 홀수인 경우
  if (k % TWO) {
    const a = dict[(k + ONE) / TWO]
      ? dict[(k + ONE) / TWO]
      : fibo((k + ONE) / TWO) % DIV;
    const b = dict[(k - ONE) / TWO]
      ? dict[(k - ONE) / TWO]
      : fibo((k - ONE) / TWO) % DIV;

    if (!dict[(k + ONE) / TWO]) {
      dict[(k + ONE) / TWO] = a;
    }
    if (!dict[(k - ONE) / TWO]) {
      dict[(k - ONE) / TWO] = b;
    }

    return (a * a + b * b) % DIV;
  }

  // 짝수인 경우
  const a = dict[k / TWO] ? dict[k / TWO] : fibo(k / TWO) % DIV;
  const b = dict[k / TWO - ONE]
    ? dict[k / TWO - ONE]
    : fibo(k / TWO - ONE) % DIV;

  if (!dict[k / TWO]) {
    dict[k / TWO] = a;
  }
  if (!dict[k / TWO - ONE]) {
    dict[k / TWO - ONE] = b;
  }

  return (a * (a + TWO * b)) % DIV;
}
