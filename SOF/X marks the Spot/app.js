const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];
rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  const n = lines[0];
  const puzzle = lines.slice(1).map((line) => line.split(" "));

  let answer = "";
  puzzle.forEach(([s, t]) => {
    for (const idx in s) {
      if (s[idx] === "x" || s[idx] === "X") {
        answer += t[idx].toUpperCase();
      }
    }
  });
  console.log(answer);
  process.exit();
});
