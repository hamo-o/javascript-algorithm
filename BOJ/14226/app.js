const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim();
const s = +input;

let answer = Infinity;
const visited = {};
const queue = [];
visited['001'] = 1;
queue.push([0, 0, 1]);

let front = 0;
while (front < queue.length) {
  const [t, save, print] = queue[front];
  front++;

  if (answer > t) {
    if (print === s && answer > t) {
      answer = t;
    }

    // 화면에 있는거 저장하기
    if (!visited[`${t + 1}${print}${print}`]) {
      visited[`${t + 1}${print}${print}`] = 1;
      queue.push([t + 1, print, print]);
    }

    // 저장된걸 화면에 옮기기
    if (!visited[`${t + 1}${save}${print + save}`] && save > 0) {
      visited[`${t + 1}${save}${print + save}`] = 1;
      queue.push([t + 1, save, print + save]);
    }

    // 화면 1개 삭제하기
    if (!visited[`${t + 1}${save}${print - 1}`] && print > 1) {
      visited[`${t + 1}${save}${print - 1}`] = 1;
      queue.push([t + 1, save, print - 1]);
    }
  }
}

console.log(answer);
