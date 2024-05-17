const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line.trim());
}).on("close", () => {
  const t = +lines[0];
  const lights = lines.slice(1).map((line) => line.split(" "));

  const numbers = {
    0: "1110111",
    1: "0010010",
    2: "1011101",
    3: "1011011",
    4: "0111010",
    5: "1101011",
    6: "1101111",
    7: "1110010",
    8: "1111111",
    9: "1111011",
    "*": "0000000",
  };

  lights.forEach((light) => {
    let [before, after] = light;
    const n = before.length;
    const m = after.length;

    if (n < m) before = before.padStart(m, "*");
    else if (n > m) after = after.padStart(n, "*");

    let count = 0;
    for (let i = 0; i < before.length; i++) {
      const before_num = numbers[before[i]];
      const after_num = numbers[after[i]];
      for (let j = 0; j < 7; j++) {
        if (before_num[j] !== after_num[j]) count++;
      }
    }
    console.log(count);
  });
  process.exit();
});
