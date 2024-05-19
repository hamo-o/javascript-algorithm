const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  const [n, k] = lines[0].split(" ").map(Number);
  const score = lines[1].split(" ").map(Number);
  const sections = lines.slice(2).map((line) => line.split(" ").map(Number));

  sections.forEach(([start, end]) => {
    let sum = 0;
    for (let i = start - 1; i < end; i++) sum += score[i];

    console.log((sum / (end - start + 1)).toFixed(2));
  });

  process.exit();
});
