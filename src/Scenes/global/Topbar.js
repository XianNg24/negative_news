import React, { Component }  from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { sidebarData } from "./sidebarData";
import deloitte_logo from "../../deloitte.png";

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.common.black,
    },
    menuBtn: {
      color: "#fff",
      "&:hover": {
        backgroundColor: theme.palette.common.black, // Uses the value in muiTheme.js
      },
    },
    deloitteLogoBtn: {
      display: "flex",
      alignItems: "center",
      marginLeft: 45,
      "&:hover": {
        opacity: 0.8,
        transition: "0.1s",
      },
    },
    sidebarPaper: {
      backgroundColor: theme.palette.common.black,
    },
  }));

const Navbar = (props) => {
    const [selectedIndex, setSelectedIndex] = useState(0); // Which sidebar item is selected
  
    // Determines which sidebar button is selected by looking at current path
    const currentPath = useLocation().pathname;
  
    useEffect(() => {
      const currentIndex = sidebarData.findIndex((element) => element.path === currentPath);
      setSelectedIndex(currentIndex);
    }, []);
  
    const [sidebar, setSidebar] = useState(false); // For toggling the temporary side bar
  
    const toggleSidebar = () => setSidebar(!sidebar);
  
    // onClick handler for clicking a sidebar item
    const clickSidebarItem = (index) => {
      toggleSidebar();
      setSelectedIndex(index);
    };
  
    const classes = useStyles(props);
  
    return (
      <>
        <AppBar position="sticky" className={classes.root}>
          <Toolbar>
            <IconButton aria-label="menu" className={classes.menuBtn} onClick={toggleSidebar}>
              <Icon>menu</Icon>
            </IconButton>
            <Link to="/" className={classes.deloitteLogoBtn} onClick={() => setSelectedIndex(0)}>
              <img class = "h-20 w-25 md:h-30 md:w-30" src={deloitte_logo} alt="Deloitte Logo" height="60" />
            </Link>
          </Toolbar>
        </AppBar>
  
        <Drawer
          anchor="left" // Open from left side
          open={sidebar} // Open if true
          onClose={toggleSidebar} // Callback fired when sidebar is closed
          classes={{ paper: classes.sidebarPaper }} // Style the sidebar's background
        >
          <Sidebar
            clickItem={clickSidebarItem} // onClick handler for items
            selected={selectedIndex} // Index of selected item
          />
        </Drawer>
      </>
    );
  };
  
  export default Navbar;
  