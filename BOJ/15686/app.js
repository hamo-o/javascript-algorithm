const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const city = input.slice(1).map((line) => line.split(' ').map(Number));

// 현재 집, 치킨집 구하기
const chicken = [];
const houses = [];
city.forEach((line, i) => {
  line.forEach((item, j) => {
    if (item === 2) chicken.push([i, j]);
    else if (item === 1) houses.push([i, j]);
  });
});

// 개별 집 치킨 거리 구하기
function calcDist(house, pick) {
  const [x, y] = house;

  let min_dist = Infinity;
  pick.forEach((chicken) => {
    const [i, j] = chicken;
    min_dist = Math.min(min_dist, Math.abs(i - x) + Math.abs(j - y));
  });

  return min_dist;
}

// 폐업시키지 않을 치킨집 고르기
const visited = new Array(chicken.length).fill(0);
let answer = Infinity;
dfs([], -1);
console.log(answer);

function dfs(pick, prev) {
  if (pick.length === m) {
    // 고른 치킨집들로 도시의 치킨 거리 구하기
    // 그중 최솟값 찾기
    let dist = 0;
    houses.forEach((house) => {
      dist += calcDist(house, pick);
    });
    answer = Math.min(answer, dist);
    return;
  }

  chicken.forEach((c, i) => {
    if (!visited[i] && prev < i) {
      visited[i] = 1;
      pick.push(c);
      dfs(pick, i);
      pick.pop();
      visited[i] = 0;
    }
  });
}
