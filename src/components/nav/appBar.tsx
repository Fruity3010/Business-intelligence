"use client";

import * as React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme, Theme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface StyledAppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface AppBarComponentProps extends StyledAppBarProps {
  onDrawerOpen: () => void;
  user: { fullName?: string; email?: string } | null;
  logout: () => void;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<StyledAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#0b3d7e",
  color: theme.palette.primary.contrastText,
  borderRadius: "0px",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppBarComponent({
  open,
  onDrawerOpen,
  user,
  logout,
  ...props
}: AppBarComponentProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <AppBar position="fixed" open={open} {...props}>
      <Toolbar className="flex w-full items-center">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          edge="start"
          sx={{ marginRight: 2, ...(open && { display: "none" }) }}
        >
          <FontAwesomeIcon icon={faBars} />
        </IconButton>

        <Box sx={{ flex: 1 }} />

        <Box className="flex items-center space-x-3">
          <IconButton color="inherit">
            <NotificationsOutlinedIcon sx={{ color: "#fff" }} />
          </IconButton>

          <Avatar
            alt={user?.fullName || "User Avatar"}
            src="https://i.pravatar.cc/150?img=68"
            sx={{ width: 32, height: 32 }}
          />

          <IconButton
            color="inherit"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            size="small"
          >
            <ExpandMoreIcon sx={{ color: "#fff" }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            PaperProps={{
              sx: { minWidth: 200 },
            }}
            disableScrollLock
          >
            <Box px={2} py={1}>
              <Typography variant="subtitle2">{user?.fullName}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {user?.email}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <MenuItem>
              <Button variant="contained" color="primary" onClick={logout} fullWidth>
                Logout
              </Button>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}