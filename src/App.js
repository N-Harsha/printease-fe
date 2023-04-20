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
import { drawerWidth, serviceProviderRole } from "./constants";
import { auth } from "./features/Login.reducer";
import PrivateRoutes from "./utils/PrivateRoutes";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./components/Home"));
const Services = lazy(() => import("./pages/Services"));
const ServiceConfig = lazy(() => import("./pages/ServiceConfig"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));

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
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<PrivateRoutes />}>
                  <Route path="/dashboard" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  {user.role === serviceProviderRole && (
                    <Route path="/services/:id" element={<ServiceConfig />} />
                  )}
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:id" element={<OrderDetails />} />
                  <Route path="/" element={<Home />} />
                </Route>
              </Routes>
            </Main>
          </Box>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
