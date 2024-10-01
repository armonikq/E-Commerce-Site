import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useLocation } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const pages = ["Ürünler", "Hakkımızda"];
const login = ["Giriş/KayıtOl"];
const settings = [
  {
    name: "Çıkış Yap",
    path: "/logout",
  },
  {
    name: "Admin",
    path: "/admin",
    isAdmin: true,
  },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
    if (token) {
      const userString = localStorage.getItem("user");
      if (userString) {
        setUser(JSON.parse(userString));
      }
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (page) => {
    if (page === "Ürünler") {
      navigate("/product");
    } else if (page === "Hakkımızda") {
      navigate("/hakkimizda");
    }
    handleCloseNavMenu();
  };

  const handleLoginClick = () => {
    navigate("/login");
    handleCloseNavMenu();
  };

  const handBasketClick = () => {
    navigate("/sepet");
    handleOpenNavMenu();
  };

  const isActivePage = (pageName) => {
    if (pageName === "Ürünler" && location.pathname === "/product") return true;
    if (pageName === "Hakkımızda" && location.pathname === "/hakkimizda")
      return true;
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
    handleCloseUserMenu();
  };

  const handleSettingClick = (setting) => {
    if (setting.name === "Çıkış Yap") {
      handleLogout();
    } else if (setting.name === "Admin") {
      navigate("/admin");
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#eceff1" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 1000,
              letterSpacing: ".1rem",
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            AyhanTicaret
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigate(page)}>
                  <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
              {login.map((item) => (
                <MenuItem key={item} onClick={handleLoginClick}>
                  <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {item}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "Black",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            AYHN
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigate(page)}
                sx={{
                  my: 2,
                  color: isActivePage(page) ? "primary.main" : "black",
                  display: "block",
                  fontWeight: isActivePage(page) ? "bold" : "normal",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box
            sx={{ flexGrow: 0, display: { xs: "none", md: "flex" }, gap: 2 }}
          >
            {!isLoggedIn &&
              login.map((item) => (
                <Button
                  key={item}
                  onClick={handleLoginClick}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    fontWeight: 550,
                  }}
                >
                  {item}
                </Button>
              ))}
            <Button
              onClick={handBasketClick}
              sx={{
                my: 2,
                color: "black",
                display: "flex",
                alignItems: "center",
                fontWeight: 550,
              }}
            >
              <ShoppingCartIcon sx={{ mr: 1 }} />
              Sepet
            </Button>
            {isLoggedIn && (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    {user?.name ? user.name[0].toUpperCase() : "U"}
                  </Avatar>
                </IconButton>
              </Tooltip>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings
                .filter((setting) => !setting.isAdmin || user?.isAdmin)
                .map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => handleSettingClick(setting)}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
