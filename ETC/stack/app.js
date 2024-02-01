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

  push(item) {
    // 1. 새로운 노드 생성
    const node = new Node(item);

    // 2. 새로운 노드의 next의 참조를 top 노드로 설정
    node.next = this.top;

    // 3. top 참조 변경
    this.top = node;

    this.length++;
  }

  pop() {
    // 스택이 비어 있는 경우
    if (!this.length) return;

    // 1. top의 data 저장
    const item = this.top.data;

    // 2. top 참조 변경
    this.top = this.top.next;

    this.length--;

    // 3. 이전 top data 반환
    return item;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
