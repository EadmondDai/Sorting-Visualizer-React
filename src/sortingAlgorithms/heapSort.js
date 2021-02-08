import {swap} from '../util/swap';

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  array = heapSortHelper(array, animations);
  return animations;
}

class Heap {
  constructor(array) {
    this.heap = array;
    this.size = array.length;
    this.buildHeap();
  }

  buildHeap() {
    let firstParentIdx = (this.heap.length - 2) / 2;
    for (let i = firstParentIdx; i >= 0; --i) {
      this.siftDown(i, this.heap.length - 1);
    }
  }

  siftDown(idx, endIdx) {
    let childOneIdx = idx * 2 + 1;
    while (childOneIdx <= endIdx) {
      let childTwoIdx = idx * 2 + 2 <= endIdx ? idx * 2 + 2 : -1;
      let idxToSwap;
      if (
        childTwoIdx !== -1 &&
        this.heap[childOneIdx] > this.heap[childTwoIdx]
      ) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }

      if (this.heap[idx] > this.heap[idxToSwap]) {
        swap(this.heap, idxToSwap, idx);
        idx = idxToSwap;
        childOneIdx = idx * 2 + 1;
      } else {
        return;
      }
    }
  }

  remove() {
    swap(this.heap, 0, this.size - 1);
    let minNum = this.heap.pop();
    this.size--;
    this.siftDown(0, this.size - 1);
    return minNum;
  }
}

function heapSortHelper(array, animations) {
  let heap = new Heap(array);
  let result = [];
  let idx = 0;
  while (heap.size > 0) {
    if (heap.size < 0) {
      throw "heap size can't be 0 right now";
    }
    animations.push([idx]);
    animations.push([idx]);
    let minNum = heap.remove();
    animations.push([idx, minNum]);
    result[idx] = minNum;
    console.log(idx, minNum, array.length);
    idx++;
  }
  console.log('How');
  return result;
}
