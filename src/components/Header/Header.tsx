import { useColorMode } from "@chakra-ui/color-mode"
import { Text, Stack, Icon, IconButton } from "@chakra-ui/react"
import { CgSun, CgMoon } from "react-icons/cg"

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header style={{ width: "100%" }}>
      <Stack direction={["column", "row"]} alignItems={"center"} justify={"center"} wrap={"wrap"} p={"1rem"}>
        <IconButton variant="outline"
          colorScheme="teal"
          aria-label="Change  Color Scheme"
          fontSize="20px"
          icon={<Icon as={colorMode === "light" ? CgSun : CgMoon} />}
          onClick={toggleColorMode}>

        </IconButton>
        <Text
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          fontSize="clamp(
            2rem,
            4vw + 0.5rem,
            5rem
          )"
          textAlign="center"
          fontWeight="extrabold"
          padding={"1rem"}
        >
          Sorting Visualizer</Text>

      </Stack>
    </header>
  )
};

export default Header;
