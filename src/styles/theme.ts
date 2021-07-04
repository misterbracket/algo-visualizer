import { extendTheme } from "@chakra-ui/react";
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const global = {
  styles: {
    global: {
      body: {
        background: "hsl(214, 50%, 98%)",
        height: "100%",
      },
      html: {
        height: "100%",
      },
      "#root": {
        height: "100%",
      },
    },
  },
};

const theme = extendTheme({ colors, ...global });
console.log(theme);

export default theme;
