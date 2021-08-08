import { useColorMode } from "@chakra-ui/color-mode"
import { Icon, IconButton } from "@chakra-ui/react"
import { CgSun, CgMoon } from "react-icons/cg"

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
      <IconButton variant="outline"
        colorScheme="teal"
        aria-label="Change  Color Scheme"
        fontSize="20px" style={{ position: "absolute", right: "20px", top: "6rem" }}
        icon={<Icon as={colorMode === "light" ? CgSun : CgMoon} />}
        onClick={toggleColorMode}>
      </IconButton>
    </header>
  )
};

export default Header;
