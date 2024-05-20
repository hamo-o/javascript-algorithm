const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const n = +input[0];
const w = (n / 3) * 5 + n / 3 - 1;
const grid = new Array(n).fill(0).map(() => new Array(w).fill(" "));

divide(w, n, 0, Math.floor(w / 2));

grid.forEach((line) => {
  console.log(line.join(""));
});

function divide(width, heigth, x, y) {
  const midH = Math.floor(heigth / 2);
  const midW = Math.floor(width / 2);

  if (heigth === 3) {
    grid[x][y] = "*";
    grid[x + 1][y - 1] = "*";
    grid[x + 1][y + 1] = "*";

    for (let i = y - 2; i <= y + 2; i++) {
      grid[x + 2][i] = "*";
    }
    return;
  }

  divide(midW, midH, x, y);
  divide(midW, midH, x + midH, y - Math.round(midW / 2));
  divide(midW, midH, x + midH, y + Math.round(midW / 2));
}
