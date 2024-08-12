import React, { useState } from "react";
import Container from "@mui/material/Container";
import logo from "../../assets/icons/logo-black1.svg";
import { Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import styles from "./Nav.module.css";
import { styled } from "@mui/material";

const CustomAppBar = styled(AppBar)({
  backgroundColor: "white",
  fontFamily: '"Karla", sans-serif',
  boxShadow: "0 5px 10px 5px rgba(0, 0, 0, .05)",
  padding: "10px 0",
  color: "black",
  zIndex: "1300",
});

function Nav() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = [
    { path: "/", text: "Characters" },
    { path: "/locations", text: "Locations" },
    { path: "/episodes", text: "Episodes" },
  ];

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className={styles.drawerBox}
    >
      <List className={styles.drawerBoxList}>
        {links.map((link) => (
          <ListItem
            key={link.text}
            component={Link}
            to={link.path}
            className={styles.link}
          >
            {link.text}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <CustomAppBar className={styles.nav}>
        <Container>
          <Box className={styles.navInner}>
            <Link to="/">
              <img src={logo} alt="logo" className={styles.logo} />
            </Link>
            <Box className={styles.links}>
              {links.map((link, index) => (
                <Link key={index} to={link.path} className={styles.link}>
                  {link.text}
                </Link>
              ))}
            </Box>
            <Box
              className={`${styles.burgerBox} ${drawerOpen ? styles.open : ""}`}
              onClick={toggleDrawer(!drawerOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </Box>
          </Box>
        </Container>
      </CustomAppBar>
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
}

export default Nav;
