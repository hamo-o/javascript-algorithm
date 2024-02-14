class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  heap_push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  heap_pop() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return value;
  }

  top() {
    if (!this.heap.length) {
      return null;
    }
    return this.heap[0];
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    let parentIdx = Math.floor((index - 1) / 2);
    while (this.heap[parentIdx] && this.heap[index] < this.heap[parentIdx]) {
      this.swap(index, parentIdx);
      index = parentIdx;
      parentIdx = Math.floor((index - 1) / 2);
    }
  }

  bubbleDown() {
    let index = 0;
    let leftIdx = index * 2 + 1;
    let rightIdx = index * 2 + 2;

    while (
      (this.heap[leftIdx] && this.heap[leftIdx] < this.heap[index]) ||
      (this.heap[rightIdx] && this.heap[rightIdx] < this.heap[index])
    ) {
      let smallerIdx = leftIdx;
      if (this.heap[rightIdx] && this.heap[rightIdx] < this.heap[smallerIdx]) {
        smallerIdx = rightIdx;
      }

      this.swap(index, smallerIdx);
      index = smallerIdx;
      leftIdx = index * 2 + 1;
      rightIdx = index * 2 + 2;
    }
  }
}

function solution(scoville, K) {
  const heap = new MinHeap();
  scoville.forEach((item) => {
    heap.heap_push(item);
  });

  let count = 0;
  while (heap.top() < K) {
    if (heap.size() === 1) {
      return -1;
    }
    const a = heap.heap_pop();
    const b = heap.heap_pop() * 2;
    heap.heap_push(a + b);

    count++;
  }
  return count;
}
