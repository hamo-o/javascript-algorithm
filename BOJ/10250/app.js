const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 한줄 여러개
// const input = fs.readFileSync(filePath).toString().trim().split(' ');

// 여러줄
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const num = +input[0];
const rooms = input.slice(1);

const findRoom = (floor, room, order) => {
  if (!(order % floor)) {
    return floor * 100 + order / floor;
  }
  const roomNum = Math.floor(order / floor) + 1;
  const floorNum = order % floor;

  return floorNum * 100 + roomNum;
};

rooms.forEach((room) => {
  const [h, w, n] = room.split(' ');
  const answer = findRoom(+h, +w, +n);
  console.log(answer);
});
