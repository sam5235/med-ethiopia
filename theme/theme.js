// theme.js
import { extendTheme } from "@chakra-ui/react";
import { CalendarDefaultTheme } from "@uselessdev/datepicker";

const theme = extendTheme(CalendarDefaultTheme, {
  colors: {
    brand: {
      50: "#defcfa",
      100: "#beefec",
      200: "#9ae1de",
      300: "#74d4d0",
      400: "#50c8c2",
      500: "#37afa9",
      600: "#278883",
      700: "#17625e",
      800: "#033b39",
      900: "#001616",
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
  components: {
    Calendar: {
      parts: ["calendar"],

      baseStyle: {
        calendar: {
          borderWidth: "6px",
          borderColor: "brand.400",
          rounded: "none",
          shadow: "none",
          boxShadow: "32px 16px 0 6px brand.400",
        },
      },
    },

    CalendarControl: {
      parts: ["button"],

      baseStyle: {
        button: {
          h: 6,
          px: 2,
          rounded: "none",
          fontSize: "sm",
          color: "white",
          bgColor: "brand.400",

          _hover: {
            bgColor: "brand.400",
          },

          _focus: {
            outline: "none",
          },
        },
      },
    },
  },
});
export default theme;
