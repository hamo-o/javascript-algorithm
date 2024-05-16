const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];
rl.on("line", (line) => {
  lines.push(line.trim());
}).on("close", () => {
  const [k, p, n] = lines[0].split(" ").map(BigInt);
  let answer = k;

  for (let i = 0; i < n; i++) {
    answer =
      ((answer % BigInt(1000000007)) * (p % BigInt(1000000007))) %
      BigInt(1000000007);
  }

  console.log(Number(answer));
  process.exit();
});
