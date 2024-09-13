import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Avatar,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header({ loggedIn, user }) {
  const nav = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Link to="/">
          <Typography
            variant="h6"
            sx={{
              flexGrow: isMobile ? 1 : 0,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <img
              src="/images/logo.png"
              style={{ width: "150px", height: "35px" }}
            />
          </Typography>
        </Link>

        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Button color="inherit">Заказы</Button>
            <Button color="inherit" onClick={() => nav("/about-us")}>
              О нас
            </Button>
            <Button color="inherit" onClick={() => nav("/support")}>
              Поддержка
            </Button>
          </Box>
        )}

        {isMobile ? (
          <>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            {loggedIn ? (
              <Avatar src={user.image} />
            ) : (
              <Button color="inherit">Войти</Button>
            )}
          </>
        ) : (
          <>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            {loggedIn ? (
              <>
                <Avatar src={user.image} />
                <Link to="/admin" className="link">
                  Админ
                </Link>
              </>
            ) : (
              <Button color="inherit">Войти</Button>
            )}
          </>
        )}

        <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
          <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
            <List>
              <ListItem button key={0}>
                <ListItemText primary={"Заказы"} />
              </ListItem>
              <ListItem button key={1}>
                <ListItemText
                  primary={"О нас"}
                  onClick={() => nav("/about-us")}
                />
              </ListItem>
              <ListItem button key={2} onClick={() => nav("/support")}>
                <ListItemText primary={"Поддержка"} />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
