import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { FaHome, FaDollarSign, FaRocket, FaUsersCog, FaEnvelope, FaClipboardList } from 'react-icons/fa'; // Add FaClipboardList for planner icon
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar"; // Add SubMenu for Planner
import { CalendarTodayOutlined, MenuOutlined, LogoutOutlined } from "@mui/icons-material";
import logo from "../../../../assets/logo.png";
import Item from "./Item";
import { ToggledContext } from "../../../DashboardApp";
import { useNavigate } from 'react-router-dom';
import Posts from "../../posts";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Token removed');
    navigate('/login');
  };

  return (
    <Sidebar
      backgroundColor={colors.primary[400]}
      rootStyles={{
        width:"19vw",
        border: 0,
        height: "100%",
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "20px 0 60px 0",
            color: colors.gray[100],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box
                width="300px"
                display="flex"
                alignItems="center"
                gap="15px"
                marginRight="7px"
                sx={{ transition: ".3s ease" }}
              >
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "8px" }}
                  src={logo}
                  alt="logo"
                />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textTransform="capitalize"
                  color="black"
                >
                  Business Buddy
                </Typography>
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>

      <Box mb={10} pl={collapsed ? undefined : "10%"}>
        <Menu
          menuItemStyles={{
            button: {
              color:"black",
              borderRadius:"30px",
              fontSize:"16.5px",
              width:"220px",
              ":hover": {
                color: "white",
                background: "black",
                borderRadius:"30px",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Home"
            path="/dashboard"
            colors={colors}
            icon={<FaHome />}
          />
        </Menu>
        <Menu
          menuItemStyles={{
            button: {
              fontSize:"16.5px",
              color:"black",
              borderRadius:"30px",
              width:"220px",
              ":hover": {
                color: "white",
                background: "black",
                borderRadius:"30px",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Store Setup"
            path="/dashboard/store"
            colors={colors}
            icon={<FaRocket />}
          />
          <Item
            title="Set Payment"
            path="/dashboard/team"
            colors={colors}
            icon={<FaDollarSign />}
          />
          <Item
            title="Social Account"
            path="/dashboard/contacts"
            colors={colors}
            icon={<FaUsersCog />}
          />
        </Menu>
        
        {/* Planner Section with SubMenu */}
        <Menu
          menuItemStyles={{
            button: {
              fontSize:"16.5px",
              color:"black",
              borderRadius:"30px",
              width:"220px",
              ":hover": {
                color: "bkack",
                background: "grey",
                borderRadius:"30px",
                transition: ".4s ease",
              },
            },
          }}
        >
          <SubMenu
            label="Planner"
            icon={<FaClipboardList />}  // Planner icon
            style={{
              fontSize: "16.5px",
              color: "black",
              borderRadius: "30px",
              ":hover": {
                color: "white",
                background: "black",
                borderRadius: "30px",
                transition: ".4s ease",
              },
            }}
          >
            <Item
              title="Posts"
              path="/dashboard/posts"
              colors={colors}
              icon={<FaEnvelope />}  // Icon for Posts
            />
            <Item
              title="Calendar"
              path="/dashboard/calendar"
              colors={colors}
              icon={<CalendarTodayOutlined />}  // Icon for Calendar
            />
          </SubMenu>
        </Menu>

        <Menu
          onClick={handleLogout}
          menuItemStyles={{
            button: {
              fontSize:"16.5px",
              color:"black",
              borderRadius:"30px",
              width:"220px",
              ":hover": {
                color: "white",
                background: "black",
                borderRadius:"30px",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Logout"
            colors={colors}
            icon={<LogoutOutlined />}
          />
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
