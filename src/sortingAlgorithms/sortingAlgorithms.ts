export function getMergeSortAnimations(array: Array<number>) {
  const animations: Array<any> = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  console.log(animations);
  return animations;
}

function mergeSortHelper(
  mainArray: Array<number>,
  startIdx: number,
  endIdx: number,
  auxiliaryArray: Array<number>,
  animations: Array<Array<number>>
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray: Array<number>,
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: Array<number>,
  animations: Array<Array<number>>
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getBubbleSortAnimations(array: Array<number>) {
  const animations: Array<Array<number>> = [];
  const animatonsArray = bubbleSortHelper(array, animations);
  return animatonsArray;
}

function bubbleSortHelper(
  array: Array<number>,
  animations: Array<Array<number | Array<number>>>
) {
  let isSorted = false;
  let counter = 0;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < array.length - 1 - counter; i++) {
      animations.push([i, i + 1]);
      animations.push([i, i + 1]);
      const heightOne = array[i];
      const heightTwo = array[i + 1];
      if (array[i] > array[i + 1]) {
        animations.push([
          [i, array[i + 1]],
          [i + 1, array[i]],
        ]);
        swap<number>(i, i + 1, array);
        isSorted = false;
      } else {
        animations.push([
          [i, heightOne],
          [i + 1, heightTwo],
        ]);
      }
    }
    counter++;
  }
  return animations;
}

function swap<T>(i: number, j: number, array: Array<T>) {
  const prevOne = array[j];
  array[j] = array[i];
  array[i] = prevOne;
}
