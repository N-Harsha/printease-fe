import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import logo from "./../images/logo.png";
import { Box, IconButton, LinearProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./../features/Login.reducer";
import { useNavigate } from "react-router-dom";
import { auth } from "./../features/Login.reducer";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(auth);
    const isLoggedIn = !(user.token.length === 0);
    const isCustomer = user.role === "ROLE_CUSTOMER";
    const isProvider = user.role === "ROLE_SERVICE_PROVIDER";
    const [login, setLogin] = useState("Login");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    useEffect(() => {
        if (isLoggedIn) setLogin("Log out");
        else setLogin("login");
    }, [user, isLoggedIn]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleLogin = () => {
        if (isLoggedIn) {
            dispatch(logout());
            navigate("/");
        } else {
            navigate("/login");
        }
    };

    return (
        <Box>
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
                    <Box
                        sx={{
                            display: { xs: "none", sm: "flex" },
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Button
                            color="inherit"
                            variant="outlined"
                            onClick={handleLogin}
                        >
                            {login}
                        </Button>
                        {!isLoggedIn && (
                            <NavLink
                                to="/signup"
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <Button color="inherit">Sign Up</Button>
                            </NavLink>
                        )}
                    </Box>
                    <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                        <IconButton onClick={handleMenu}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem onClick={handleLogin}>{login}</MenuItem>
                            {!isLoggedIn && (
                                <MenuItem onClick={() => navigate("/signup")}>
                                    Sign In
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
