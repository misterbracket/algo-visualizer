import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
// const global = {
//   global: {
//     body: {
//       // background: "hsl(214, 50%, 98%)",
//       height: "100%",
//       background: "red",
//     },
//     html: {
//       height: "100%",
//     },
//     "#root": {
//       height: "100%",
//     },
//   },
// };
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, colors });
console.log(theme);

export default theme;
