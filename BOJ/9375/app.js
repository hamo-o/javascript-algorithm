const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const len = input.length;

const n = +input[0];
const clothes = input.slice(1);

const calcFashion = (clothes) => {
  const graph = {};
  clothes.forEach((cloth) => {
    const [value, key] = cloth;
    graph[key] = graph[key] ? [...graph[key], value] : [value];
  });

  let cases = 1;
  for (const key in graph) {
    const len = graph[key].length;
    cases *= len + 1;
  }

  return cases - 1;
};

let i = 0;
while (i < len - 1) {
  const m = +clothes[i];
  const cloth = [];
  for (let j = 0; j < m; j++) {
    cloth.push(clothes[i + 1 + j].split(' '));
  }
  console.log(calcFashion(cloth));

  i += m + 1;
}
