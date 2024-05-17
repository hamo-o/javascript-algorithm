const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on("line", (line) => {
  lines.push(line.trim());
}).on("close", () => {
  // 회의실의 수, 예약된 회의의 수
  const [n, m] = lines[0].split(" ").map(Number);

  const rooms = {};
  for (let i = 1; i <= n; i++) {
    rooms[lines[i]] = [];
  }
  for (let i = n + 1; i <= n + m; i++) {
    const [name, start, end] = lines[i].split(" ");
    rooms[name].push([+start, +end]);
  }

  // 09-18시 남은 빈 시간대 구하기
  const answer = [];
  for (const key in rooms) {
    rooms[key].sort((a, b) => a[0] - b[0]);

    const possible = [];
    let prev = 9;
    rooms[key].forEach(([start, end]) => {
      if (prev < start) possible.push([prev, start]);
      prev = end;
    });
    if (prev < 18) possible.push([prev, 18]);

    answer.push([key, possible]);
  }
  answer.sort();

  answer.forEach(([name, possible], idx) => {
    console.log(`Room ${name}:`);
    console.log(
      `${possible.length ? possible.length : "Not"} available${
        possible.length ? ":" : ""
      }`
    );
    possible.forEach(([start, end]) => {
      console.log(
        `${start.toString().padStart(2, "0")}-${end
          .toString()
          .padStart(2, "0")}`
      );
    });
    if (idx < answer.length - 1) console.log("-".repeat(5));
  });

  process.exit();
});
