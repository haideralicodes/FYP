import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar"; 
import { MenuOutlined, LogoutOutlined } from "@mui/icons-material";
import logo from "../../../../assets/logo.png";
import Item from "./Item";
import { ToggledContext } from "../../../DashboardApp";
import { useNavigate, useLocation } from 'react-router-dom';

import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';
import Groups2Icon from '@mui/icons-material/Groups2';
import InsightsIcon from '@mui/icons-material/Insights';

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Token removed');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Sidebar
      backgroundColor={colors.primary[400]}  
      rootStyles={{
        height: "100%",
        boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.1)',
        width:"260px"
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" }, borderRadius: "30px", },
        }}
      >
        <MenuItem
        sx={{borderRadius:"30px", border:'2px solid red'}}
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

      <Box>
        <Menu
          active={isActive("/dashboard")}
          menuItemStyles={{
            button: {
              color: isActive("/dashboard") ? "#ffffff" : "black",
              background: isActive("/dashboard") ? "#000000" : "transparent",
              borderTopRightRadius:"30px",
              borderBottomRightRadius:"30px",
              fontSize:"17px",
              fontWeight:"450",
              marginBottom:"10px",
              paddingLeft:"30px",
              width:"220px",
              transition: "all 0.3s ease-in-out",
              ":hover": {
                color: "#ffffff",
                background: "#000000",
                transform: "scale(1)", 
                transition: "all 0.3s ease-in-out", 
              },
            },
          }}
        >
          <Item
            title="Home"
            path="/dashboard"
            colors={colors}
            icon={<OtherHousesOutlinedIcon />}
          />
        </Menu>

        <Menu
          active={isActive("/dashboard/store")}
          menuItemStyles={{
            button: {
              color: isActive("/dashboard/store") ? "#ffffff" : "black",
              background: isActive("/dashboard/store") ? "#000000" : "transparent",
              borderTopRightRadius:"30px",
              borderBottomRightRadius:"30px",
              fontSize:"17px",
              fontWeight:"450",
              marginBottom:"10px",
              paddingLeft:"30px",
              width:"220px",
              transition: "all 0.3s ease-in-out",
              ":hover": {
                color: "#ffffff",
                background: "#000000",
                transform: "scale(1)", 
                transition: "all 0.3s ease-in-out", 
              },
            },
          }}
        >
          <Item
            title="Store Setup"
            path="/dashboard/store"
            colors={colors}
            icon={<RocketLaunchOutlinedIcon />}
          />
        </Menu>

        <Menu
          menuItemStyles={{
            button: {
              color: "black",
              background: "transparent",
              borderTopRightRadius:"30px",
              borderBottomRightRadius:"30px",
              fontSize:"17px",
              fontWeight:"450",
              marginBottom:"10px",
              paddingLeft:"30px",
              width:"220px",
              transition: "all 0.3s ease-in-out",
              ":hover": {
                color: "#ffffff",
                background: "#000000",
                transform: "scale(1)", 
                transition: "all 0.3s ease-in-out", 
              },
            },
          }}
        >
          <SubMenu
            label="Social Accounts"
            icon={<Groups2Icon />}  
            active={isActive("/dashboard/LinkSocialAccounts")}
            style={{
              fontSize: "17px",
              borderTopRightRadius:"30px",
              borderBottomRightRadius:"30px",
              color: isActive("/dashboard/GeneratePosters") ? "#ffffff" : "black",
              background: isActive("/dashboard/GeneratePosters") ? "#000000" : "transparent",
              transition: "all 0.3s ease-in-out",
              ":hover": {
                color: "#ffffff",
                background: "#000000",
                borderRadius: "30px",
              },
            }}
          >
            <Item
              title="Link Socials"
              path="/dashboard/LinkSocialAccounts"
              colors={colors}
              icon={<DashboardCustomizeOutlinedIcon />}
            />
            <Item
              title="Analytics"
              path="/dashboard/SocialAnalytics"
              colors={colors}
              icon={<InsightsIcon />}
            />
          </SubMenu>
        </Menu>
        
        {/* Planner Section with SubMenu */}
        <Menu
          menuItemStyles={{
            button: {
              color:"black",
              borderTopRightRadius:"30px",
              borderBottomRightRadius:"30px",
              fontSize:"17px",
              fontWeight:"450",
              marginBottom:"10px",
              paddingLeft:"30px",
              width:"220px",
              transition: "all 0.3s ease-in-out",
              ":hover": {
                color: "#ffffff",
                background: "#000000",
                transform: "scale(1)", 
                transition: "all 0.3s ease-in-out", 
              },
            },
          }}
        >
          <SubMenu
            label="Planner"
            icon={<EventNoteOutlinedIcon />}  
            active={isActive("/dashboard/GeneratePosters")}
            style={{
              fontSize: "17px",
              borderTopRightRadius:"30px",
              borderBottomRightRadius:"30px",
              color: isActive("/dashboard/GeneratePosters") ? "#ffffff" : "black",
              background: isActive("/dashboard/GeneratePosters") ? "#000000" : "transparent",
              transition: "all 0.3s ease-in-out",
              ":hover": {
                color: "#ffffff",
                background: "#000000",
                borderRadius: "30px",
              },
            }}
          >
            <Item
              title="Posts"
              path="/dashboard/GeneratePosters"
              colors={colors}
              icon={<StickyNote2OutlinedIcon />}  
            />
            <Item
              title="Calendar"
              path="/dashboard/calendar"
              colors={colors}
              icon={<CalendarMonthOutlinedIcon />}  
            />
          </SubMenu>
        </Menu>


        <Menu
          active={isActive("/dashboard/userProfile")}
          menuItemStyles={{
            button: {
              color: isActive("/dashboard/userProfile") ? "#ffffff" : "black",
              background: isActive("/dashboard/userProfile") ? "#000000" : "transparent",
              borderTopRightRadius:"30px",
              borderBottomRightRadius:"30px",
              fontSize:"17px",
              fontWeight:"450",
              marginBottom:"10px",
              paddingLeft:"30px",
              width:"220px",
              transition: "all 0.3s ease-in-out",
              ":hover": {
                color: "#ffffff",
                background: "#000000",
                transform: "scale(1)", 
                transition: "all 0.3s ease-in-out", 
              },
            },
          }}
        >
          <Item
            title="Saved Posts"
            path="/dashboard/ViewSavedPosts"
            colors={colors}
            icon={<TurnedInNotOutlinedIcon />}  
          />

        </Menu>

        {/* Website Management Suite Section with SubMenu */}
        <Menu
          menuItemStyles={{
            button: {
              color:"black",
              borderTopRightRadius:"30px",
              borderBottomRightRadius:"30px",
              fontSize:"17px",
              fontWeight:"450",
              marginBottom:"10px",
              paddingLeft:"30px",
              width:"220px",
              transition: "all 0.3s ease-in-out",
              ":hover": {
                color: "#ffffff",
                background: "#000000",
                transform: "scale(1)", 
                transition: "all 0.3s ease-in-out", 
              },
            },
          }}
        >
          <SubMenu
            label="Web Suite"
            icon={<StorefrontRoundedIcon />}  
            active={isActive("/dashboard/GeneratePosters")}
            style={{
              fontSize: "17px",
              borderTopRightRadius:"30px",
              borderBottomRightRadius:"30px",
              color: isActive("/dashboard/GeneratePosters") ? "#ffffff" : "black",
              background: isActive("/dashboard/GeneratePosters") ? "#000000" : "transparent",
              transition: "all 0.3s ease-in-out",
              ":hover": {
                color: "#ffffff",
                background: "#000000",
                borderRadius: "30px",
              },
            }}
          >
            <Item
              title="Products"
              path="/dashboard/Websuite/Products"
              colors={colors}
              icon={<Inventory2Icon />}  
            />
            <Item
              title="Categories"
              path="/dashboard/Websuite/Categories"
              colors={colors}
              icon={<CategoryIcon />}  
            />
          </SubMenu>
        </Menu>

        <Menu
          active={isActive("/dashboard/userProfile")}
          menuItemStyles={{
            button: {
              color: isActive("/dashboard/userProfile") ? "#ffffff" : "black",
              background: isActive("/dashboard/userProfile") ? "#000000" : "transparent",
              borderTopRightRadius:"30px",
              borderBottomRightRadius:"30px",
              fontSize:"17px",
              fontWeight:"450",
              marginBottom:"10px",
              paddingLeft:"30px",
              width:"220px",
              transition: "all 0.3s ease-in-out",
              ":hover": {
                color: "#ffffff",
                background: "#000000",
                transform: "scale(1)", 
                transition: "all 0.3s ease-in-out", 
              },
            },
          }}
        >
          <Item
            title="My Profile"
            path="/dashboard/userProfile"
            colors={colors}
            icon={<AccountBoxOutlinedIcon />}  // Icon for Profile
          />

        </Menu>

        <Menu
          active={isActive("/dashboard/team")}
          menuItemStyles={{
            button: {
              color: isActive("/dashboard/team") ? "#ffffff" : "black",
              background: isActive("/dashboard/team") ? "#000000" : "transparent",
              borderTopRightRadius:"30px",
              borderBottomRightRadius:"30px",
              fontSize:"17px",
              fontWeight:"450",
              marginBottom:"10px",
              paddingLeft:"30px",
              width:"220px",
              transition: "all 0.3s ease-in-out",
              ":hover": {
                color: "#ffffff",
                background: "#000000",
                transform: "scale(1)", 
                transition: "all 0.3s ease-in-out", 
              },
            },
          }}
        >
          <Item
            title="Set Payment"
            path="/dashboard/team"
            colors={colors}
            icon={<PaidOutlinedIcon />}
          />
        </Menu>

        <Menu
          onClick={handleLogout}
          menuItemStyles={{
            button: {
              color:"black",
              borderTopRightRadius:"30px",
              borderBottomRightRadius:"30px",
              fontSize:"17px",
              fontWeight:"450",
              marginBottom:"10px",
              paddingLeft:"30px",
              width:"220px",
              transition: "all 0.3s ease-in-out",
              ":hover": {
                color: "#ffffff",
                background: "#000000",
                transform: "scale(1)", 
                transition: "all 0.3s ease-in-out", 
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
