import { useState, useEffect } from 'react'
import {
  Box, Flex, Spacer, Slider, Text,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb, Heading
} from "@chakra-ui/react"

import { Button, ButtonGroup } from "@chakra-ui/react"
import { getMergeSortAnimations } from '../../sortingAlgorithms/sortingAlgorithms';

//Height of Single Bar
const BAR_HEIGHT = 530;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'hotpink';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'rebeccapurple';

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function initializeState() {
  const numberOfBars = 50
  const barWidth = 3
  const animationSpeed = 15
  const array = [];
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

  const [state, setState] = useState(initializeState)
  const { numberOfBars, array, barWidth, animationSpeed } = state


  useEffect(() => {
    resetArray();
  }, [numberOfBars, barWidth, animationSpeed])


  function resetArray() {
    const { array } = initializeState()
    setState({ ...state, array });
  }

  function mergeSort() {
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
    <>
      <Heading size="2xl" padding={"4rem"}>Sorting Visualizer</Heading>
      <Flex width={"100%"} direction={"column"} >
        <Flex align={"flex-end"} justify={"center"} height={`${BAR_HEIGHT}px`} width={"100%"}>
          {array.map((value, idx) => (
            <>
              <Box
                className="array-bar"
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                  width: `${barWidth}px`,
                  display: "inline-block",
                }}
                key={idx}
              ></Box>
              <Spacer />
            </>
          ))}
        </Flex>

        <Flex direction={'column'} paddingTop={"2rem"} paddingBottom={"3rem"}>
          <ButtonGroup display={"flex"} flexWrap={"wrap"} width={"100%"} paddingBottom={"0.5rem"}>
            <Button colorScheme="yellow" onClick={resetArray}>Generate New Array</Button>
            <Button colorScheme="teal" style={{ marginLeft: "auto" }} onClick={mergeSort}>Merge Sort</Button>
            <Button colorScheme="teal" onClick={quickSort}>Quick Sort</Button>
            <Button colorScheme="teal" onClick={heapSort}>Heap Sort</Button>
            <Button colorScheme="teal" onClick={bubbleSort}>Bubble Sort</Button>
          </ButtonGroup>
          <ButtonGroup paddingTop={"0.5rem"}>
            <Flex width={"100%"} direction={"column"}>
              <Text as={"label"} htmlFor={"bar-width-slider"}>Bar Width</Text>
              <Slider colorScheme="teal" aria-label="bar-width-slider" name={"bar-width-slider"} defaultValue={barWidth} min={2} max={5} onChange={width => setState({ ...state, barWidth: width })}>
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
              <Text as={"label"} htmlFor={"bar-number-slider"}>Number of Bars</Text>
              <Slider colorScheme="teal" aria-label="bar-number-slider" defaultValue={numberOfBars} min={10} max={100} onChange={number => setState({ ...state, numberOfBars: number })}>
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
              <Slider colorScheme="teal" aria-label="bar-number-slider" defaultValue={animationSpeed} min={15} max={1500} onChange={number => setState({ ...state, animationSpeed: number })}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize={6}>
                  <Box color="tomato" />
                </SliderThumb>

              </Slider>
            </Flex>
          </ButtonGroup>
        </Flex>
      </Flex>
    </>
  );
}




export default SortingVisualizer;
