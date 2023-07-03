import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    primary: {
      main: "#004E9A",
    },
    secundary: {
      main: "#FFC107",
    },
    background: {
      main: "#003B75",
    },
    lightGray: {
      main: "#eaeaea",
    },
    mediumGray: {
      main: "#c4c4c4",
    },
    success: {
      main: "#1B9454",
    },
    white: {
      main: "#FFFFFF",
    },
    black: {
      main: "#000000",
    },
    lightBlack: {
      main: "#666666",
    },
    warning: {
      main: "#E2B93B",
    },
    totemData: {
      main: "#008000",
    },
  },
  fonts: {
    modalLabel: {
      size: "12px",
      lineHeight: "16px",
      color: "#000000",
    },
    modalTitle: {
      size: "16px",
      lineHeight: "16px",
      color: "#FFC107",
    },
  },
});
