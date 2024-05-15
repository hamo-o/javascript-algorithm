const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];
rl.on("line", (line) => {
  lines.push(line.trim());
}).on("close", () => {
  const map = lines.map((line) => line.split(" ").map(Number));
  let answer = 2;
  for (let i = 0; i < 3; i++) {
    answer = Math.min(answer, checkValue(map[i][0], map[i][1], map[i][2]));
    answer = Math.min(answer, checkValue(map[0][i], map[1][i], map[2][i]));
  }
  console.log(answer);

  function checkValue(a, b, c) {
    if (a === b) return Math.abs(a - c);
    else if (a === c) return Math.abs(a - b);
    else if (b === c) return Math.abs(a - b);
    else return 2;
  }
  process.exit();
});
