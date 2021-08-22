import { useState, useRef } from 'react'
import {
  Box, Flex, Spacer, Slider, Text,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb, Select, Stack, HStack
} from "@chakra-ui/react"
import { MdGraphicEq } from "react-icons/md"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { getMergeSortAnimations, getBubbleSortAnimations, getInsertionSortAnimations, getQuickSortAnimations } from '../../sortingAlgorithms/sortingAlgorithms';

//Height of Single Bar
const BAR_HEIGHT = 340;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'teal';

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
  const [animationSpeed, setAnimationSpeed] = useState(40)
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



  // function heapSort() {
  //   // We leave it as an exercise to the viewer of this code to implement this method.
  // }

  function getSortingAnimations(algorithm: "bubble" | "insertion" | "quick") {
    let animatonsArray: Array<Array<number | Array<number>>>
    switch (algorithm) {
      case "bubble":
        animatonsArray = getBubbleSortAnimations([...array])
        break
      case "insertion":
        animatonsArray = getInsertionSortAnimations([...array])
        break
      case "quick":
        animatonsArray = getQuickSortAnimations([...array])
        console.log(animatonsArray)
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
      <Flex width={"100%"} direction={"column"} >
        <HStack h={350} justify="center" align="flex-end" spacing="5px" overflowX="auto">
          {array.map((value, idx) => (<Box key={value} >
            <Box
              ref={(element) => { arrayBarDivsRefs.current[idx] = element! }}
              background={PRIMARY_COLOR}
              h={`${value}px`}
              w={`${barWidth * 10}px`}
            ></Box>
          </Box>)

          )}
        </HStack>
        <Flex direction={'column'} paddingTop={"2rem"} paddingBottom={"3rem"}>
          <Stack direction={["column", "row"]} justify="space-between" spacing={2}>
            <Stack direction={["column", "row"]} spacing={2}>
              <Button isLoading={isAnimationRunning} bgGradient="linear(to-l, #7928CA,#FF0080)"
                // _hover={{ bg: "#2255a3" }}
                _hover={{ bg: "linear-gradient(90deg, rgba(121,40,202,1) 0%, rgba(255,0,128,1) 90%)" }}
                color={"white"}
                fontWeight="extrabold" onClick={resetArray}>Generate New Array</Button>
            </Stack>
            <Stack direction={["column", "row"]} spacing={2}>
              <Button isLoading={isAnimationRunning} colorScheme="teal" variant={"outline"} onClick={mergeSort}>Merge Sort</Button>
              <Button isLoading={isAnimationRunning} colorScheme="teal" variant={"outline"} onClick={() => getSortingAnimations("insertion")}>Insertion Sort</Button>
              <Button isLoading={isAnimationRunning} colorScheme="teal" variant={"outline"} onClick={() => getSortingAnimations("quick")}>Quick Sort</Button>
              {/*   <Button colorScheme="teal" onClick={heapSort}>Heap Sort</Button>*/}
              <Button isLoading={isAnimationRunning} colorScheme="teal" variant={"outline"} onClick={() => getSortingAnimations("bubble")}>Bubble Sort</Button>
            </Stack>
          </Stack>
          <ButtonGroup spacing={4} paddingTop="2rem">
            <Stack width="100%" direction={["column", "row"]} spacing={2}>
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
                    <Box color="teal" as={MdGraphicEq} />
                  </SliderThumb>
                </Slider>
              </Flex>
              <Spacer />
              <Flex width={"100%"} direction={"column"}>
                <Text as={"label"} htmlFor={"bar-number-slider"}>Animation Speed</Text>
                <Slider height={10} isDisabled={isAnimationRunning} step={30}
                  colorScheme="teal" aria-label="bar-number-slider" defaultValue={animationSpeed} min={10} max={310} onChange={number => setAnimationSpeed(number)}>
                  <SliderTrack >
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb boxSize={6}>
                    <Box color="teal" as={MdGraphicEq} />
                  </SliderThumb>
                </Slider>
              </Flex>
            </Stack>
          </ButtonGroup >
        </Flex >
      </Flex >
    </>
  );
}




export default SortingVisualizer;
