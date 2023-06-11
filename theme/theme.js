// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
        50: '#defcfa',
        100: '#beefec',
        200: '#9ae1de',
        300: '#74d4d0',
        400: '#50c8c2',
        500: '#37afa9',
        600: '#278883',
        700: '#17625e',
        800: '#033b39',
        900: '#001616',
    },
  },
  initialColorMode: "light",
  useSystemColorMode: false,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "#f5f5f5",
      },
    }),
  },
});
export default theme;

