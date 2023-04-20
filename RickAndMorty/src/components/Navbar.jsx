import {
  Toolbar,
  Typography,
  Container,
  IconButton,
  MenuItem,
  Menu,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/logo.png";
import logowhite from "../assets/logo_white.png";

function NavBar() {
  const pages = ["CHARACTERS", "LOCATIONS", "EPISODES", "CONTACT"];
  const theme = useTheme();
  const colorMode = useContext(ThemeContext);
  const [mobileMenu, setmobileMenu] = useState(null);

  const toggleNavMenu = (event) => {
    setmobileMenu(mobileMenu ? null : event.currentTarget);
  };

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      <Container>
        <Toolbar className="toolbar" sx={{ justifyContent: "space-between" }}>
          <Box>
            <Link to="/">
              {theme.palette.mode !== "dark" ? (
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "6.5rem", marginLeft: "2rem" }}
                />
              ) : (
                <img
                  src={logowhite}
                  alt="logo"
                  style={{ width: "6.5rem", marginLeft: "2rem" }}
                />
              )}
            </Link>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={toggleNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                <NavLink
                  to={`${page.toLowerCase()}`}
                  style={{
                    textDecoration: "none",
                    color: `${theme.palette.primary.contrastText}`,
                  }}
                >
                  {page}
                </NavLink>
              </Button>
            ))}

            <Box display="flex">
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon sx={{ color: "white" }} />
                ) : (
                  <LightModeOutlinedIcon sx={{ color: "black" }} />
                )}
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              justifyContent: "flex-end",
            }}
          >
            <Box display="flex">
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon sx={{ color: "white" }} />
                ) : (
                  <LightModeOutlinedIcon sx={{ color: "black" }} />
                )}
              </IconButton>
            </Box>
            <IconButton size="large" onClick={toggleNavMenu} color="black">
              {mobileMenu ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={mobileMenu}
              open={Boolean(mobileMenu)}
              onClose={toggleNavMenu}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={toggleNavMenu}
                  sx={{ width: "100vw", justifyContent: "center" }}
                >
                  <Typography>
                    <NavLink
                      to={`${page.toLowerCase()}`}
                      style={{
                        textDecoration: "none",
                        color: `${theme.palette.primary.contrastText}`,
                      }}
                    >
                      {page}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
}

export default NavBar;
