const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line.trim());
}).on("close", () => {
  // n개의 규칙 구간, m개의 테스트 구간
  const [n, m] = lines[0].split(" ").map(Number);

  let rlen = 0;
  const rules = [];
  lines.slice(1, n + 1).forEach((line) => {
    const [l, v] = line.split(" ").map(Number);
    rlen += l;
    rules.push([rlen, v]);
  });

  let tlen = 0;
  const tests = [];
  lines.slice(n + 1, n + m + 1).forEach((line) => {
    const [l, v] = line.split(" ").map(Number);
    tlen += l;
    tests.push([tlen, v]);
  });

  let ri = 0;
  let ti = 0;
  let answer = 0;
  while (ri < n || ti < m) {
    const gap = tests[ti][1] - rules[ri][1];
    if (gap > 0) answer = Math.max(answer, gap);

    if (rules[ri][0] < tests[ti][0]) ri++;
    else if (rules[ri][0] > tests[ti][0]) ti++;
    else {
      ri++;
      ti++;
    }
  }

  console.log(answer);
});
