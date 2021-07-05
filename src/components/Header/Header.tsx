import { useColorMode } from "@chakra-ui/color-mode"
import { Button } from "@chakra-ui/react"

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </header>
  )
};

export default Header;
