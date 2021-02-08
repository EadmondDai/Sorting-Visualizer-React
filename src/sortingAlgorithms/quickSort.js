import {swap} from '../util/swap';

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, startIdx, endIdx, animation) {
  if (startIdx >= endIdx) return;
  let pivotIdx = startIdx;
  let leftIdx = pivotIdx + 1;
  let rightIdx = endIdx;
  while (leftIdx <= rightIdx) {
    animation.push([pivotIdx, leftIdx, rightIdx]);
    animation.push([pivotIdx, leftIdx, rightIdx]);
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
      animation.push([leftIdx, array[rightIdx], rightIdx, array[leftIdx]]);
      swap(array, leftIdx, rightIdx);
      leftIdx++;
      rightIdx--;
    }
    if (array[leftIdx] <= array[pivotIdx]) {
      leftIdx++;
    }
    if (array[rightIdx] >= array[pivotIdx]) {
      rightIdx--;
    }
    animation.push([]);
  }
  animation.push([pivotIdx, array[rightIdx], rightIdx, array[pivotIdx]]);
  swap(array, pivotIdx, rightIdx);
  quickSortHelper(array, startIdx, rightIdx - 1, animation);
  quickSortHelper(array, rightIdx + 1, endIdx, animation);
}
