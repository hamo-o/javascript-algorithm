class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.length = 0;
  }

  /**
   * 스택의 맨 위에 원소를 추가합니다.
   * @param {any} value - 스택의 맨 위에 추가할 원소.
   */
  push(value) {
    const node = new Node(value);
    node.prev = this.top;
    this.top = node;

    this.length++;
  }

  /**
   * 스택의 맨 위 원소를 꺼내어 반환합니다.
   * @return {any}
   */
  pop() {
    if (!this.length) return;
    const value = this.top.data;
    this.top = this.top.prev;

    this.length--;
    return value;
  }

  /**
   * 스택의 맨 위 원소를 반환합니다.
   * @returns {any}
   */
  peek() {
    if (!this.length) return;
    return this.top.value;
  }
}

class Queue {
  constructor() {
    this.inputStack = new Stack();
    this.outputStack = new Stack();
  }

  enqueue(value) {
    this.inputStack.push(value);
  }

  dequeue() {
    if (!this.outputStack.length) {
      this.#move();
    }
    if (!this.outputStack.length) return;
    return this.outputStack.pop();
  }

  #move() {
    while (this.inputStack.length) {
      this.outputStack.push(this.inputStack.pop());
    }
  }
}

const queue = new Queue();
