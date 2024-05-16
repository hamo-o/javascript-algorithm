const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line.trim());
}).on("close", () => {
  const n = +lines[0];

  let side = 2;
  for (let i = 1; i <= n; i++) {
    side += side - 1;
  }

  console.log(side * side);

  process.exit();
});
