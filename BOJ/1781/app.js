const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const n = +input[0];
const problems = input.slice(1).map((line) => line.split(' ').map(Number));
problems.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  #swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  size() {
    return this.heap.length - 1;
  }

  heap_push(value) {
    this.heap.push(value);

    let curIdx = this.size();
    let parentIdx = Math.floor(curIdx / 2);
    while (this.heap[curIdx] < this.heap[parentIdx]) {
      this.#swap(curIdx, parentIdx);

      curIdx = parentIdx;
      parentIdx = Math.floor(curIdx / 2);
    }
  }

  heap_pop() {
    if (!this.size()) {
      return null;
    }
    if (this.size() === 1) {
      return this.heap.pop();
    }

    this.#swap(1, this.size());
    const value = this.heap.pop();

    let curIdx = 1;
    let leftChildIdx = curIdx * 2;
    let rightChildIdx = curIdx * 2 + 1;
    while (
      (this.heap[leftChildIdx] &&
        this.heap[curIdx] > this.heap[leftChildIdx]) ||
      (this.heap[rightChildIdx] && this.heap[curIdx] > this.heap[rightChildIdx])
    ) {
      const smallIdx =
        this.heap[rightChildIdx] &&
        this.heap[leftChildIdx] > this.heap[rightChildIdx]
          ? rightChildIdx
          : leftChildIdx;
      if (this.heap[curIdx] > this.heap[smallIdx]) {
        this.#swap(curIdx, smallIdx);
        curIdx = smallIdx;
      }

      leftChildIdx = curIdx * 2;
      rightChildIdx = curIdx * 2 + 1;
    }
    return value;
  }

  top() {
    if (!this.size()) {
      return null;
    }
    return this.heap[1];
  }
}

const heap = new MinHeap();
let solve = 0;
for (const [day, count] of problems) {
  if (solve < day) {
    heap.heap_push(count);
    solve++;
  } else if (heap.size() && heap.top() < count) {
    heap.heap_pop();
    heap.heap_push(count);
  }
}

let answer = 0;
while (heap.size()) answer += heap.heap_pop();

console.log(answer);
