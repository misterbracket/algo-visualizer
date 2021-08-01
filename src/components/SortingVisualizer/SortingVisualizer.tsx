import { useState, useRef } from 'react'
import {
  Box, Flex, Spacer, Slider, Text,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb, Heading, Select, Grid
} from "@chakra-ui/react"

import { Button, ButtonGroup } from "@chakra-ui/react"
import { getMergeSortAnimations, getBubbleSortAnimations, getInsetionSortAnimations } from '../../sortingAlgorithms/sortingAlgorithms';

//Height of Single Bar
const BAR_HEIGHT = 340;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'hotpink';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'rebeccapurple';

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getUniqueRandomNumber(numberSet: any): any {
  const num = randomIntFromInterval(5, BAR_HEIGHT)
  if (!numberSet.has(num)) {
    return num
  }
  return getUniqueRandomNumber(numberSet)
}

function initializeArray(numberOfBars = 15) {
  const array = []
  let numberSet = new Set()
  for (let i = 0; i < numberOfBars; i++) {
    const randomNumber = getUniqueRandomNumber(numberSet)
    numberSet.add(randomNumber)
    array.push(randomNumber);

  }
  return array
}


const SortingVisualizer = () => {

  const [barWidth, setBarWidth] = useState(1)
  const [animationSpeed, setAnimationSpeed] = useState(15)
  const [numberOfBars, setNumberOfBars] = useState(15)
  const [array, setArray] = useState(() => initializeArray(numberOfBars))
  const [isAnimationRunning, setIsAnimationRunning] = useState(false)

  const arrayBarDivsRefs = useRef<HTMLDivElement[]>([]);


  function resetArray() {
    const newArray = initializeArray(numberOfBars)
    setArray(newArray);
  }

  function changeNumberOfBars(num: number) {
    const newArray = initializeArray(num)
    setArray(newArray);
    setNumberOfBars(num)
  }

  function mergeSort() {
    const animations = getMergeSortAnimations([...array]);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = arrayBarDivsRefs.current
      const isColorChange = i % 3 !== 2;
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

  // function selectionSort() {
  //   // We leave it as an exercise to the viewer of this code to implement this method.
  // }

  // function quickSort() {
  //   // We leave it as an exercise to the viewer of this code to implement this method.
  // }

  // function heapSort() {
  //   // We leave it as an exercise to the viewer of this code to implement this method.
  // }

  function insertionsAndBubbleSort(algorithm: "bubble" | "insertion") {
    let animatonsArray: Array<Array<number | Array<number>>>
    switch (algorithm) {
      case "bubble":
        animatonsArray = getBubbleSortAnimations([...array])
        break
      case "insertion":
        animatonsArray = getInsetionSortAnimations([...array])
        break
      default:
        animatonsArray = getBubbleSortAnimations([...array])
    }

    for (let i = 0; i < animatonsArray.length; i++) {
      const arrayBars = arrayBarDivsRefs.current
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animatonsArray[i];
        const barOneStyle = arrayBars[barOneIdx as number].style;
        const barTwoStyle = arrayBars[barTwoIdx as number].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOne, barTwo] = animatonsArray[i];
          const [barOneIdx, newBarOneHeight] = barOne as [number, number]
          const [barTwoIdx, newBarTwoHeight] = barTwo as [number, number]
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${newBarOneHeight}px`;
          barTwoStyle.height = `${newBarTwoHeight}px`;
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
        <Grid templateColumns="repeat(auto-fit, 30px)" autoFlow='column' style={{ justifyContent: "center" }} alignItems="end" height={`${BAR_HEIGHT + 20}px`} overflowX="auto">
          {array.map((value, idx) => (<Box key={value} >
            <Box
              ref={(element) => { arrayBarDivsRefs.current[idx] = element! }}
              background={PRIMARY_COLOR}
              h={`${value}px`}
              w={`${barWidth * 10}px`}
            ></Box>
          </Box>)

          )}
        </Grid>

        <Flex direction={'column'} paddingTop={"2rem"} paddingBottom={"3rem"}>
          <ButtonGroup display={"flex"} flexWrap={"wrap"} width={"100%"} paddingBottom={"0.5rem"}>
            <Button isDisabled={isAnimationRunning} colorScheme="yellow" onClick={resetArray}>Generate New Array</Button>
            <Button isDisabled={isAnimationRunning} colorScheme="teal" variant={"outline"} style={{ marginLeft: "auto" }} onClick={mergeSort}>Merge Sort</Button>
            <Button isDisabled={isAnimationRunning} colorScheme="teal" variant={"outline"} onClick={() => insertionsAndBubbleSort("insertion")}>Insertion Sort</Button>
            {/* <Button colorScheme="teal" onClick={quickSort}>Quick Sort</Button>
            <Button colorScheme="teal" onClick={heapSort}>Heap Sort</Button>*/}
            <Button isDisabled={isAnimationRunning} colorScheme="teal" variant={"outline"} onClick={() => insertionsAndBubbleSort("bubble")}>Bubble Sort</Button>
            {/* <Button colorScheme="teal" onClick={test}>Test</Button> */}
          </ButtonGroup>
          <ButtonGroup spacing={4} paddingTop={"0.5rem"}>
            <Flex width={"100%"} direction={"column"}>
              <Text as={"label"} htmlFor={"bar-width-select"}>Bar Width</Text>
              <Select height={10} placeholder="Select Bar Width" aria-label="bar-width-select" name={"bar-width-select"} onChange={event => setBarWidth(parseFloat(event.target.value))}>
                <option value={0.5}>Extra Thin</option>
                <option value={1}>Thin</option>
                <option value={1.5}>Medium</option>
                <option value={2.5}>Large</option>
              </Select>
            </Flex>
            <Spacer />
            <Flex width={"100%"} direction={"column"}>
              <Text as={"label"} htmlFor={"bar-number-slider"}>Number of Bars</Text>
              <Slider height={10} disabled={isAnimationRunning} colorScheme="teal" aria-label="bar-number-slider" defaultValue={numberOfBars} min={10} max={30} onChange={num => changeNumberOfBars(num)}>
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
              <Slider height={10} isDisabled={isAnimationRunning} colorScheme="teal" aria-label="bar-number-slider" defaultValue={animationSpeed} min={15} max={1500} onChange={number => setAnimationSpeed(number)}>
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
