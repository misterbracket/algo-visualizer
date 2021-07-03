import {useState, useEffect} from 'react'

import {getMergeSortAnimations} from '../../sortingAlgorithms/sortingAlgorithms';
  // Change this value for the speed of the animations.
  const ANIMATION_SPEED_MS = 1;

  // Change this value for the number of bars (value) in the array.
  const NUMBER_OF_ARRAY_BARS = 310;

  // This is the main color of the array bars.
  const PRIMARY_COLOR = 'hotpink';

  // This is the color of array bars that are being compared throughout the animations.
  const SECONDARY_COLOR = 'golenrod';

  // From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  function randomIntFromInterval(min : number , max: number ) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function initializeArray() {
    const array = [];
      for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
        array.push(randomIntFromInterval(5, 730));
      }
      return array
  }

const SortingVisualizer = () => {
  const [array, setArray] = useState<Array<number>>(initializeArray)


  useEffect(() => {
    resetArray();
  }, [])


  function  resetArray() {
      const array = initializeArray()
      setArray(array);
    }

  function  mergeSort() {
      const animations = getMergeSortAnimations(array);
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
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

    function quickSort() {
      // We leave it as an exercise to the viewer of this code to implement this method.
    }

    function heapSort() {
      // We leave it as an exercise to the viewer of this code to implement this method.
    }

    function bubbleSort() {
      // We leave it as an exercise to the viewer of this code to implement this method.
    }



      return (
        <div style={{
            position: "absolute",
            left: "100px"
        }}>
          {array.map((value, idx) => (
            <div
            className="array-bar"
              style={{
                 backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                width: "2px",
                display: "inline-block",
                margin: "0 1px"}}
              key={idx}
            ></div>
          ))}
          <button onClick={resetArray}>Generate New Array</button>
          <button onClick={mergeSort}>Merge Sort</button>
          <button onClick={quickSort}>Quick Sort</button>
          <button onClick={heapSort}>Heap Sort</button>
          <button onClick={bubbleSort}>Bubble Sort</button>
        </div>
      );
    }




export default SortingVisualizer;
