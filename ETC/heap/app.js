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
    // 1. 가장 마지막에 push
    this.heap.push(value);

    // 2. 부모노드와 비교하며 작다면 부모노드와 swap
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

    // 1. 가장 끝 노드와 swap
    this.#swap(1, this.size());

    // 2. 가장 끝 노드 없애기
    const value = this.heap.pop();

    // 3. 왼쪽 / 오른쪽 자식과 비교 후 현재 노드가 더 크면 swap
    let curIdx = 1;
    let leftChildIdx = curIdx * 2;
    let rightChildIdx = curIdx * 2 + 1;
    while (
      (this.heap[leftChildIdx] &&
        this.heap[curIdx] > this.heap[leftChildIdx]) ||
      (this.heap[rightChildIdx] && this.heap[curIdx] > this.heap[rightChildIdx])
    ) {
      // 3-1. 왼쪽과 오른쪽 자식 중 더 작은 값의 인덱스 찾기
      const smallIdx =
        this.heap[rightChildIdx] &&
        this.heap[leftChildIdx] > this.heap[rightChildIdx]
          ? rightChildIdx
          : leftChildIdx;
      // 3-2. 비교 후 현재 인덱스의 값이 더 크면 swap
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
