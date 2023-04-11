import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import logo from "./../images/logo.png";
import { Box, LinearProgress } from "@mui/material";
import { Grid } from "@material-ui/core";
import { Link ,NavLink} from "react-router-dom";

function Navbar() {
    return (
        <Box>
            {/* <LinearProgress/> */}
            <AppBar position="static">
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <img
                            src={logo}
                            alt="Logo"
                            width="50px"
                            style={{ borderRadius: "50%" }}
                        />
                        <Typography variant="h6">Print Ease</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <NavLink
                            to="/login"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Button color="inherit" variant="outlined">
                                Login
                            </Button>
                        </NavLink>
                        <NavLink
                            to="/signup"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Button color="inherit">Sign Up</Button>
                        </NavLink>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
