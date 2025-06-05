const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [n, k] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let count = 0;
let answer = -1;
sort(0, n - 1);

console.log(answer);

function sort(start, end) {
  if (answer !== -1) return;
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    sort(start, mid);
    sort(mid + 1, end);
    merge(arr, start, mid, end);
  }
}

function merge(a, start, mid, end) {
  const temp = [];
  let [i, j] = [start, mid + 1];

  while (i <= mid && j <= end) {
    if (a[i] <= a[j]) temp.push(a[i++]);
    else temp.push(a[j++]);
  }

  while (i <= mid) temp.push(a[i++]);
  while (j <= end) temp.push(a[j++]);

  i = start;
  t = 0;
  while (i <= end) {
    a[i++] = temp[t++];
    count++;
    if (count === k) return (answer = temp[t - 1]);
  }
}
