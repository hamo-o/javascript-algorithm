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

  const comp = lines.slice(1).map((line) => {
    return line.split(" ").map((num, i) => [+num, i]);
  });
  const total = new Array(n).fill(0).map((item, i) => [item, i]);

  comp.forEach((arr) => {
    calcRank(arr);
    arr.forEach(([score, id]) => {
      total[id][0] += score;
    });
  });

  calcRank(total);

  function calcRank(arr) {
    const answer = new Array(n).fill(0);

    arr.sort((a, b) => b[0] - a[0]);
    arr.forEach(([score, id], i) => {
      if (i > 0) {
        const [ps, pi] = arr[i - 1];
        answer[id] = score === ps ? answer[pi] : i + 1;
      } else {
        answer[id] = i + 1;
      }
    });

    console.log(answer.join(" "));
  }

  process.exit();
});
