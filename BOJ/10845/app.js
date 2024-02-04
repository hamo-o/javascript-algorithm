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

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }

  enqueue(data) {
    const newItem = new Node(data);

    if (!this.length) {
      this.front = newItem;
    } else {
      this.rear.next = newItem;
    }

    this.rear = newItem;

    this.length++;
  }

  dequeue() {
    if (!this.length) {
      return null;
    }

    if (this.front === this.rear) {
      this.rear = null;
    }
    const popItem = this.front.data;
    this.front = this.front.next;

    this.length--;

    return popItem;
  }
}

const queue = new Queue();
const answer = [];
for (let i = 1; i <= n; i++) {
  const cmd = input[i].split(' ');
  if (cmd[0] === 'push') {
    queue.enqueue(cmd[1]);
  } else if (cmd[0] === 'pop') {
    const item = queue.dequeue();
    answer.push(item ? item : -1);
  } else if (cmd[0] === 'size') {
    answer.push(queue.length);
  } else if (cmd[0] === 'empty') {
    answer.push(queue.length ? 0 : 1);
  } else if (cmd[0] === 'front') {
    answer.push(queue.length ? queue.front.data : -1);
  } else if (cmd[0] === 'back') {
    answer.push(queue.length ? queue.rear.data : -1);
  }
}
console.log(answer.join('\n'));
