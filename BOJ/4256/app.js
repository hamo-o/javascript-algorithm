const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const t = +input[0];

for (let i = 0; i < t; i++) {
  const n = +input[1 + i * 3];
  const preorder = input[1 + i * 3 + 1].split(" ").map(Number);
  const inorder = input[1 + i * 3 + 2].split(" ").map(Number);

  const answer = [];
  findPostorder(0, 0, n - 1);
  console.log(answer.join(" "));

  function findPostorder(center, start, end) {
    if (start === end) answer.push(inorder[start]);
    if (start >= end || center >= n - 1) return;

    for (let i = start; i <= end; i++) {
      if (inorder[i] === preorder[center]) {
        findPostorder(center + 1, start, i - 1);
        findPostorder(center + (i - start + 1), i + 1, end);
        answer.push(inorder[i]);
        break;
      }
    }
  }
}
