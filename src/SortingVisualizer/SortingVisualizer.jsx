import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/mergeSort.js';
import {getQuickSortAnimations} from '../sortingAlgorithms/quickSort';
import {getBubbleSortAnimations} from '../sortingAlgorithms/bubbleSort';
import {getHeapSortAnimations} from '../sortingAlgorithms/heapSort';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    let shouldChangeColor = true;
    for (let i = 0; i < animations.length; ++i) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i].length === 3;
      if (isColorChange) {
        const [pivotIdx, barOneIdx, barTwoIdx] = animations[i];
        const pivotStyle = arrayBars[pivotIdx].style;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = shouldChangeColor ? SECONDARY_COLOR : PRIMARY_COLOR;
        shouldChangeColor = !shouldChangeColor;
        setTimeout(() => {
          pivotStyle.backgroundColor = color;
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        if (animations[i].length <= 0) {
          setTimeout(() => {}, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [
              barOneIdx,
              barOneHeight,
              barTwoIdx,
              barTwoHeight,
            ] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.height = `${barOneHeight}px`;
            barTwoStyle.height = `${barTwoHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }
  }

  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    let shouldChangeColor = true;
    for (let i = 0; i < animations.length; ++i) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const colorChange = animations[i].length === 1;
      if (colorChange) {
        const [idx] = animations[i];
        const color = shouldChangeColor ? SECONDARY_COLOR : PRIMARY_COLOR;
        shouldChangeColor = !shouldChangeColor;
        setTimeout(() => {
          arrayBars[idx].style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [idx, height] = animations[i];
        setTimeout(() => {
          arrayBars[idx].style.height = `${height}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    let shouldChangeColor = true;
    for (let i = 0; i < animations.length; ++i) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const colorChange = animations[i].length === 2;
      if (colorChange) {
        const [prev, cur] = animations[i];
        const color = shouldChangeColor ? SECONDARY_COLOR : PRIMARY_COLOR;
        shouldChangeColor = !shouldChangeColor;
        setTimeout(() => {
          arrayBars[prev].style.backgroundColor = color;
          arrayBars[cur].style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [prev, prevHeight, cur, curHeight] = animations[i];
        setTimeout(() => {
          arrayBars[prev].style.height = `${prevHeight}px`;
          arrayBars[cur].style.height = `${curHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
