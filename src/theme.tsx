import { createTheme } from "@mui/material";
import { deepPurple, grey, teal, red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple["A700"],
    },
    secondary: {
      main: grey[900],
    },
    info: {
      main: teal["A200"],
    },
    success: {
      main: teal[600],
    },
    error: {
      main: red[900],
    },
  },
  breakpoints: {
    values: {
      xxs: 0, // small phone
      xs: 385, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
});
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxs: true;
  }
}
