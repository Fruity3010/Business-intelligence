"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useAuth } from "@/hooks/auth";

import ThemeRegistry from "../../themes/themeRegistry";
import ProtectedRoute from "../../components/protectedRoute";

import AppBarComponent from "../../components/nav/appBar";
import DrawerComponent from "../../components/nav/sideDrawer";

const drawerWidth = 240;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { user, logout } = useAuth();


  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <ThemeRegistry>
      <ProtectedRoute>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <AppBarComponent
            open={open}
            onDrawerOpen={handleDrawerOpen}
            user={user}
            logout={logout}
          />
          <DrawerComponent
            open={open}
            onClose={handleDrawerClose}
            onLogout={logout}
            isMobile={isMobile}
          />
          <Box
            component="main"
            sx={{
              mt: 8,
              flexGrow: 1,
              width: {
                xs: "100%",
                sm: open
                  ? `calc(99.5% - ${drawerWidth}px)`
                  : `calc(99.9% - ${theme.spacing(8)} + 1px)`,
              },
              transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.standard,
              }),
              minHeight: "100vh",
            }}
          >
            {children}
          </Box>
        </Box>
      </ProtectedRoute>
    </ThemeRegistry>
  );
}
