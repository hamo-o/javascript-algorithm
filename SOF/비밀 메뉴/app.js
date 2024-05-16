const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line.trim());
}).on("close", () => {
  const [m, n, k] = lines[0].split(" ").map(Number);
  const answer = lines[1].split(" ");
  const user = lines[2].split(" ");

  const result = checkSecret();
  console.log(result);

  function checkSecret() {
    if (user.length < answer.length) return "normal";
    let i = 0;
    while (i < user.length) {
      if (user[i] === answer[0]) {
        let j = 0;
        while (j < answer.length && user[i + j] === answer[j]) j++;
        if (j === answer.length) {
          return "secret";
        }
      }
      i++;
    }
    return "normal";
  }

  process.exit();
});
