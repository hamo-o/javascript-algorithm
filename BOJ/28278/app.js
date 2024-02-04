const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.length = 0;
  }

  push(data) {
    const newItem = new Node(data);

    newItem.next = this.top;
    this.top = newItem;

    this.length++;
  }

  pop() {
    if (!this.length) {
      return null;
    }

    const delItem = this.top.data;
    this.top = this.top.next;

    this.length--;

    return delItem;
  }

  pick() {
    return this.top.data;
  }

  isEmpty() {
    return this.length ? 0 : 1;
  }
}

const stack = new Stack();
const answer = [];
for (let i = 1; i <= n; i++) {
  const cmd = input[i].split(' ').map(Number);
  if (cmd[0] === 1) {
    stack.push(cmd[1]);
  } else if (cmd[0] === 2) {
    const item = stack.pop();
    answer.push(item ?? -1);
  } else if (cmd[0] === 3) {
    answer.push(stack.length);
  } else if (cmd[0] === 4) {
    answer.push(stack.isEmpty());
  } else if (cmd[0] === 5) {
    answer.push(stack.length ? stack.pick() : -1);
  }
}
console.log(answer.join('\n'));
