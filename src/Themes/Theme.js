import { orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const LightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: orange[600] },
  },
});
export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: orange[600] },
  },
});
