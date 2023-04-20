import Drawer from "@mui/material/Drawer";
import { OrdersIcon } from "../images/OrdersIcon";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import {
  Box,
  Icon,
  IconButton,
  ListItemButton,
  ListItemIcon,
  SvgIcon,
  Typography,
  styled,
} from "@mui/material";
import logo from "./../images/logo.png";
import { customerRole, drawerWidth, serviceProviderRole } from "../constants";
import CreateOrdersIcon from "../images/CreateOrdersIcon";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "../images/DashboardIcon";
import { useSelector } from "react-redux";
import { auth } from "../features/Login.reducer";
import { ServiceIcon } from "../images/ServiceIcon";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

function MenuDrawer({ handleDrawerClose, open }) {
  const navigate = useNavigate();
  const user = useSelector(auth);
  const role = user.role;
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src={logo}
            alt="Logo"
            width="50px"
            style={{ borderRadius: "50%" }}
          />
          <Typography variant="h6">Print Ease</Typography>
        </Box>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => navigate("/dashboard")}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => navigate("/orders")}>
          <ListItemButton>
            <ListItemIcon>
              <OrdersIcon />
            </ListItemIcon>
            <ListItemText primary={"All Orders"} />
          </ListItemButton>
        </ListItem>
        {role === customerRole && (
          <ListItem disablePadding onClick={() => navigate("/services")}>
            <ListItemButton>
              <ListItemIcon>
                <CreateOrdersIcon />
              </ListItemIcon>
              <ListItemText primary={"Place Order"} />
            </ListItemButton>
          </ListItem>
        )}
        {role === serviceProviderRole && (
          <ListItem disablePadding onClick={() => navigate("/services")}>
            <ListItemButton>
              <ListItemIcon>
                <ServiceIcon />
              </ListItemIcon>
              <ListItemText primary={"Associated services"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}

export default MenuDrawer;
