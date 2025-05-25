'use client';

import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faTachometerAlt,
  faChartBar,
  faCog,
  faUserCircle,
  faQuestionCircle,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  borderRadius: '0px',
  boxSizing: 'border-box',
  ...(open ? openedMixin(theme) : closedMixin(theme)),
  '& .MuiDrawer-paper': {
    ...(open ? openedMixin(theme) : closedMixin(theme)),
    position: 'fixed',
    borderRight: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
    paddingBottom: theme.spacing(2),
  },
}));

interface DrawerComponentProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  isMobile: boolean;
}

export default function DrawerComponent({
  open,
  onClose,
  onLogout,
  isMobile,
}: DrawerComponentProps) {
  const theme = useTheme();

  const drawerContent = (
    <Box>
      <DrawerHeader className="flex justify-between items-center px-2">
        {!isMobile && !open ? (
          <Avatar
            alt="Logo"
            src="https://i.pravatar.cc/40?img=10"
            sx={{ width: 32, height: 32 }}
          />
        ) : isMobile || open ? (
          <Avatar
            alt="Logo"
            src="https://i.pravatar.cc/40?img=10"
            sx={{ width: 32, height: 32 }}
          />
        ) : null}


        <IconButton onClick={onClose}>
          {theme.direction === 'rtl' ? (
            <FontAwesomeIcon icon={faChevronRight} />
          ) : (
            <FontAwesomeIcon icon={faChevronLeft} />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {['Dashboard', 'Reports', 'Settings'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <Link
              href={'#'}
              passHref
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? 'initial' : 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 0 && <FontAwesomeIcon icon={faTachometerAlt} />}
                  {index === 1 && <FontAwesomeIcon icon={faChartBar} />}
                  {index === 2 && <FontAwesomeIcon icon={faCog} />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {['Profile', 'Help'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <Link
              href={'#'}
              passHref
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? 'initial' : 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 0 && <FontAwesomeIcon icon={faUserCircle} />}
                  {index === 1 && <FontAwesomeIcon icon={faQuestionCircle} />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          onClick={onLogout}
          sx={{
            minHeight: 48,
            px: 2.5,
            justifyContent: open ? 'initial' : 'center',
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  if (isMobile) {
    return (
      <MuiDrawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRadius: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBottom: 2,
          },
        }}
      >
        {drawerContent}
      </MuiDrawer>
    );
  }

  return (
    <Drawer variant="permanent" open={open}>
      {drawerContent}
    </Drawer>
  );
}