import React from "react";

import { DispatchContext, StateContext } from "../../../contexts/UserDataContext";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Logo from "../../../images/LogoLight.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { auth } from "../../../firebase-config";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const TopAppBar: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "SIGN-OUT" });
    } catch {
      console.log();
    }
  };

  const settings = [{ name: "Sign Out", function: signOutUser }];
  const location = useLocation();
  const pageName =
    location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2);
  return (
    <AppBar position="fixed" sx={{ top: 0 }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ minHeight: { xs: "60px" }, padding: "0rem 0" }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ height: "40px", marginRight: "1rem" }}
          />
          <Typography
            noWrap
            component="span"
            sx={{
              mr: 2,
              fontWeight: 500,
              fontSize: "1.4rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            {pageName}
          </Typography>
          <Box
            sx={{ flexGrow: 2, display: "flex", flexDirection: "row-reverse" }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  alt="Remy Sharp"
                  src={state.user.avatarURL}
                  sx={{
                    height: "40px",
                    width: "40px",
                    border: "2px solid white",
                  }}
                />
              </IconButton>
            </Tooltip>
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
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={setting.function}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopAppBar;
