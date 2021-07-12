import { useState, useEffect, useRef } from 'react'
import {
  Box, Flex, Spacer, Slider, Text,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb, Heading, Select
} from "@chakra-ui/react"

import { Button, ButtonGroup } from "@chakra-ui/react"
import { getMergeSortAnimations } from '../../sortingAlgorithms/sortingAlgorithms';

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

  return {
    numberOfBars,
    array,
    barWidth,
    animationSpeed
  }
}


const SortingVisualizer = () => {

  const [state, setState] = useState(() => initializeState({}))
  const { numberOfBars, array, barWidth, animationSpeed } = state

  const arrayBarRefs = useRef<HTMLDivElement[]>([]);


  // const setRef = useMemo(() => {
  //   return array
  // }, [])
  // const originalArray = useRef(setRef)

  const numberOfBarsRef = useRef(numberOfBars)

  const resetArray = () => {
    const { array } = initializeState({ numberOfBars })
    setState({ ...state, array });
  }


  useEffect(() => {

    console.log("Current: ", numberOfBars)
    console.log("PREV: ", numberOfBarsRef.current)
    console.log(state)
    if (numberOfBars !== numberOfBarsRef.current) {
      const { array } = initializeState({ numberOfBars })
      setState({ ...state, array });
      numberOfBarsRef.current = numberOfBars
    }
  }, [state, numberOfBars])


  // function test() {
  //   const currArray = array
  //   const orArray = originalArray.current
  //   console.log({ orArray })
  //   console.log({ currArray })

  //   let filteredArray: Array<number> = []

  //   const filterValues = (input: Array<number>, checkNumber: number) => {
  //     if (input === []) return
  //     const result = input.filter(value => value === checkNumber);
  //     filteredArray = result
  //     return filterValues(result)
  //   }

  //   if (filteredArray === []) {
  //     console.log("💯 Check complete, all numbers present")
  //   }
  // }


  function mergeSort() {

    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = arrayBarRefs.current
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
  }

  // function quickSort() {
  //   // We leave it as an exercise to the viewer of this code to implement this method.
  // }

  // function heapSort() {
  //   // We leave it as an exercise to the viewer of this code to implement this method.
  // }

  // function bubbleSort() {
  //   // We leave it as an exercise to the viewer of this code to implement this method.
  // }



  return (
    <>
      <Heading size="2xl" padding={"4rem"}>Sorting Visualizer</Heading>
      <Flex width={"100%"} direction={"column"} >
        <Flex align={"flex-end"} justify={"space-around"} height={`${BAR_HEIGHT}px`} width={"100%"}>
          {array.map((value, idx) => (
            <div key={idx}>
              <Box
                ref={(element) => { arrayBarRefs.current[idx] = element! }}
                className="array-bar"
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                  width: `${barWidth}px`,
                  display: "inline-block",
                }}
              ></Box>
            </div>
          ))}
        </Flex>

        <Flex direction={'column'} paddingTop={"2rem"} paddingBottom={"3rem"}>
          <ButtonGroup display={"flex"} flexWrap={"wrap"} width={"100%"} paddingBottom={"0.5rem"}>
            <Button colorScheme="yellow" onClick={resetArray}>Generate New Array</Button>
            <Button colorScheme="teal" variant={"outline"} style={{ marginLeft: "auto" }} onClick={mergeSort}>Merge Sort</Button>
            {/* <Button colorScheme="teal" onClick={quickSort}>Quick Sort</Button>
            <Button colorScheme="teal" onClick={heapSort}>Heap Sort</Button>
            <Button colorScheme="teal" onClick={bubbleSort}>Bubble Sort</Button>
            <Button colorScheme="teal" onClick={test}>Test</Button> */}
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
              <Slider height={10} colorScheme="teal" aria-label="bar-number-slider" defaultValue={numberOfBars} min={10} max={100} onChange={number => setState({ ...state, numberOfBars: number })}>
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
              <Slider height={10} colorScheme="teal" aria-label="bar-number-slider" defaultValue={animationSpeed} min={15} max={1500} onChange={number => setState({ ...state, animationSpeed: number })}>
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
