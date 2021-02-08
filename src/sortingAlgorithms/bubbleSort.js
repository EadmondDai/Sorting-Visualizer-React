import {swap} from '../util/swap';

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortHelper(array, animations);
  return animations;
}

function bubbleSortHelper(array, animations) {
  let sorted = 0;
  for (let i = 0; i < array.length - sorted; ++i) {
    for (let j = i + 1; j < array.length - sorted; ++j) {
      animations.push([j - 1, j]);
      animations.push([j - 1, j]);
      if (array[j] < array[j - 1]) {
        animations.push([j - 1, array[j], j, array[j - 1]]);
        swap(array, j, j - 1);
      }
    }
    sorted++;
  }
}
