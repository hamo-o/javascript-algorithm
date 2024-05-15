const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];
rl.on("line", (line) => {
  lines.push(line.trim()); // 공백 제거 잊지 말자 ㅠ
}).on("close", () => {
  const n = +lines[0];
  const radius = lines[1].split(" ").map(Number);

  let answer = 0;
  for (let i = 2; i <= 100; i++) {
    let count = 0;
    for (const r of radius) {
      if (!(r % i)) count++;
    }
    answer = Math.max(answer, count);
  }

  console.log(answer);
  process.exit();
});
