import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import { selectIsLightTheme } from "./features/Theme.reducer";
import { DarkTheme, LightTheme } from "./Themes/Theme";
import { Box, CssBaseline, styled } from "@mui/material";
import { lazy } from "react";

import MenuDrawer from "./components/MenuDrawer";
import { drawerWidth } from "./constants";
import { auth } from "./features/Login.reducer";
import OrderDetails from "./components/OrderDetails";

const PrivateRoute = (props) => {
  return <Route {...props} />;
};

const Login = lazy(() => import("./components/Login"));
const SignUp = lazy(() => import("./components/SignUp"));
const Home = lazy(() => import("./components/Home"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Service = lazy(() => import("./components/Service"));
const Orders = lazy(() => import("./components/Orders"));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(10),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

function App() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const user = useSelector(auth);

  const isLightTheme = useSelector(selectIsLightTheme);
  return (
    <div className="App">
      <ThemeProvider theme={isLightTheme ? LightTheme : DarkTheme}>
        <CssBaseline>
          <Box sx={{ display: "flex" }}>
            <Navbar handleDrawerOpen={handleDrawerOpen} open={open} />
            <MenuDrawer handleDrawerClose={handleDrawerClose} open={open} />
            <Main open={open}>
              <Routes>
                <Route path="/login" Component={Login} />
                <Route path="/signup" Component={SignUp} />
                <Route path="/dashboard" Component={Dashboard} />
                <Route path="/service/:id" Component={Service} />
                <Route path="/orders" Component={Orders} />
                <Route path="/orders/:id" Component={OrderDetails} />
                <Route path="/" Component={Home} />
              </Routes>
            </Main>
          </Box>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
