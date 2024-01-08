const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m, b] = input[0].split(' ');

const soils = [];
input.slice(1).forEach((line) => {
  soils.push(...line.split(' ').map(Number));
});
const soilCounts = new Array(257).fill(0);
soils.forEach((soil) => (soilCounts[soil] += 1));

const checkTime = (h, inventory) => {
  let time = 0;
  for (const soil in soilCounts) {
    if (h > soil) {
      time += soilCounts[soil] * (h - soil);
      inventory -= soilCounts[soil] * (h - soil);
    } else if (h < soil) {
      time += 2 * soilCounts[soil] * (soil - h);
      inventory += soilCounts[soil] * (soil - h);
    }
  }
  if (inventory < 0) {
    return Infinity;
  }
  return time;
};

let minTime = Infinity;
let maxHeight = 0;

for (let height = 0; height <= 256; height++) {
  const finalTime = checkTime(height, b);

  if (finalTime < minTime) {
    minTime = finalTime;
    maxHeight = height;
  } else if (finalTime === minTime) {
    if (maxHeight < height) {
      maxHeight = height;
    }
  }
}

console.log(minTime, maxHeight);
