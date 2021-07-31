import { useState, useRef } from 'react'
import {
  Box, Flex, Spacer, Slider, Text,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb, Heading, Select
} from "@chakra-ui/react"

import { Button, ButtonGroup } from "@chakra-ui/react"
import { getMergeSortAnimations, getBubbleSortAnimations } from '../../sortingAlgorithms/sortingAlgorithms';

//Height of Single Bar
const BAR_HEIGHT = 340;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'hotpink';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'rebeccapurple';

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function initializeState({ numberOfBars = 50, barWidth = "3", animationSpeed = 15, array = [] }: { numberOfBars?: number, barWidth?: string, animationSpeed?: number, array?: Array<number> }) {

  for (let i = 0; i < numberOfBars; i++) {
    array.push(randomIntFromInterval(5, BAR_HEIGHT));
  }
  array = [20, 180, 200, 80, 140, 120, 60, 100, 40, 160]
  return {
    numberOfBars,
    array,
    barWidth,
    animationSpeed
  }
}


const SortingVisualizer = () => {

  const [state, setState] = useState(() => initializeState({}))
  const [isAnimationRunning, setIsAnimationRunning] = useState(false)
  const { numberOfBars, array, barWidth, animationSpeed } = state

  const arrayBarDivsRefs = useRef<HTMLDivElement[]>([]);
  const arrayRef = useRef(array);
  const originalArrayRef = useRef([...array])



  function resetArray() {
    const { array } = initializeState({ numberOfBars })
    setState({ ...state, array });
    originalArrayRef.current = [...array]
    arrayRef.current = [...array]
  }

  function changeNumberOfBars(num: number) {
    const { array } = initializeState({ numberOfBars: num })
    const currState = state
    setState({ ...currState, numberOfBars: num, array });
    originalArrayRef.current = [...array]
    arrayRef.current = [...array]
  }


  // eslint-disable-next-line
  function test() {
    const originalArray = originalArrayRef.current
    const sortedArray = array
    console.log("Original Array: ", originalArray)
    console.log("Sorted Array: ", sortedArray)
    const result = originalArray.every(elem => sortedArray.includes(elem));

    if (result === true) {
      console.log("💯 Check complete, all numbers present")
    } else {
      console.log("🔔 What is happening")
    }
  }

  //TODO: Should be a promise
  function mergeSort() {

    const currArray = state.array
    arrayRef.current = [...array]
    const animations = getMergeSortAnimations(currArray);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = arrayBarDivsRefs.current
      const isColorChange = i % 3 !== 2;
      console.log(isColorChange)
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }

    setIsAnimationRunning(true)
    setTimeout(() => {
      setIsAnimationRunning(false)
    }, animations.length * animationSpeed)
  }

  // function quickSort() {
  //   // We leave it as an exercise to the viewer of this code to implement this method.
  // }

  // function heapSort() {
  //   // We leave it as an exercise to the viewer of this code to implement this method.
  // }

  function bubbleSort() {

    const currArray = state.array
    arrayRef.current = [...array]

    const animatonsArray = getBubbleSortAnimations(currArray);
    console.log(animatonsArray)
    let currentIdx = 1
    for (let i = 0; i < animatonsArray.length; i++) {
      const arrayBars = arrayBarDivsRefs.current
      let isColorChange = false
      if (currentIdx === 1) {
        isColorChange = true
        currentIdx = 2
        console.log(currentIdx)
      } else if (currentIdx === 2) {
        isColorChange = true
        currentIdx = 3
        console.log(currentIdx)
      } else if (currentIdx === 3) {
        isColorChange = false
        currentIdx = 4
        console.log(currentIdx)
      } else if (currentIdx === 4) {
        isColorChange = false
        currentIdx = 1
        console.log(currentIdx)
      }
      console.log(animatonsArray[i])
      if (isColorChange) {
        console.log("CHANGING COLOR")
        const [barOneIdx, barTwoIdx] = animatonsArray[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = currentIdx === 2 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        console.log("CHANGING HEIGHT")
        setTimeout(() => {
          const [barOneIdx, newHeight] = animatonsArray[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }

    setIsAnimationRunning(true)
    setTimeout(() => {
      setIsAnimationRunning(false)
    }, animatonsArray.length * animationSpeed)
  }

  return (
    <>
      <Heading size="3xl" padding={"4rem"}>Sorting Visualizer</Heading>
      <Flex width={"100%"} direction={"column"} >
        <Flex align={"flex-end"} justify={"space-around"} height={`${BAR_HEIGHT}px`} width={"100%"}>
          {arrayRef.current.map((value, idx) => (
            <div key={idx}>
              <Box
                ref={(element) => { arrayBarDivsRefs.current[idx] = element! }}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                  width: `${barWidth}px`,
                  display: "inline-block",
                }}
              ></Box>
              <div>{value}</div>
            </div>
          ))}
        </Flex>

        <Flex direction={'column'} paddingTop={"2rem"} paddingBottom={"3rem"}>
          <ButtonGroup display={"flex"} flexWrap={"wrap"} width={"100%"} paddingBottom={"0.5rem"}>
            <Button isDisabled={isAnimationRunning} colorScheme="yellow" onClick={resetArray}>Generate New Array</Button>
            <Button isDisabled={isAnimationRunning} colorScheme="teal" variant={"outline"} style={{ marginLeft: "auto" }} onClick={mergeSort}>Merge Sort</Button>
            {/* <Button colorScheme="teal" onClick={quickSort}>Quick Sort</Button>
            <Button colorScheme="teal" onClick={heapSort}>Heap Sort</Button>*/}
            <Button colorScheme="teal" onClick={bubbleSort}>Bubble Sort</Button>
            {/* <Button colorScheme="teal" onClick={test}>Test</Button> */}
          </ButtonGroup>
          <ButtonGroup spacing={4} paddingTop={"0.5rem"}>
            <Flex width={"100%"} direction={"column"}>
              <Text as={"label"} htmlFor={"bar-width-select"}>Bar Width</Text>
              <Select height={10} placeholder="Select Bar Width" aria-label="bar-width-select" name={"bar-width-select"} onChange={event => setState({ ...state, barWidth: event.target.value })}>
                <option value={"2"}>Extra Thin</option>
                <option value={"3"}>Thin</option>
                <option value={"4"}>Medium</option>
                <option value={"5"}>Large</option>
              </Select>
            </Flex>
            <Spacer />
            <Flex width={"100%"} direction={"column"}>
              <Text as={"label"} htmlFor={"bar-number-slider"}>Number of Bars</Text>
              <Slider height={10} disabled={isAnimationRunning} colorScheme="teal" aria-label="bar-number-slider" defaultValue={10} min={10} max={100} onChange={num => changeNumberOfBars(num)}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize={6}>
                  <Box color="tomato" />
                </SliderThumb>
              </Slider>
            </Flex>
            <Spacer />
            <Flex width={"100%"} direction={"column"}>
              <Text as={"label"} htmlFor={"bar-number-slider"}>Animation Speed</Text>
              <Slider height={10} isDisabled={isAnimationRunning} colorScheme="teal" aria-label="bar-number-slider" defaultValue={animationSpeed} min={15} max={1500} onChange={number => setState({ ...state, animationSpeed: number })}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize={6}>
                  <Box color="tomato" />
                </SliderThumb>

              </Slider>
            </Flex>
          </ButtonGroup >
        </Flex >
      </Flex >
    </>
  );
}




export default SortingVisualizer;
