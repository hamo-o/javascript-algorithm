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
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue());
console.log(queue);
console.log(queue.dequeue());
console.log(queue);
console.log(queue.dequeue());
console.log(queue);
