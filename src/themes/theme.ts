import { createTheme, ThemeOptions } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const commonThemeOptions: ThemeOptions = {

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        body {
          font-feature-settings: "liga" on,"clig" on;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `,
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '0 !important',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 48,
          padding: '0 16px',
          '&.Mui-expanded': {
            minHeight: 48,
          },
        },
        content: {
          margin: '12px 0 !important',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0 16px 16px',
        },
      },
    },
  },
};

export const getAppTheme = (mode: 'light' | 'dark') => {
  const palette = mode === 'light'
    ? {
        mode: 'light' as const,
        primary: {
          main: '#0b3d7e',
          light: '#42A5F5',
          dark: '#1565C0',
          contrastText: '#FFFFFF',
          100: '#0b3d7e',
        },
        secondary: {
          main: '#E0E0E0',
          light: '#EEEEEE',
          dark: '#BDBDBD',
          contrastText: '#1A202C',
        },
        error: {
          main: '#D32F2F',
        },
        warning: {
          main: '#FF9800',
        },
        info: {
          main: '#2196F3',
        },
        success: {
          main: '#4CAF50',
        },
        background: {
          default: '#F8FAFC',
          paper: '#FFFFFF',
        },
        text: {
          primary: '#1A202C',
          secondary: '#4A5568',
          disabled: '#A0AEC0',
        },
        divider: '#E2E8F0',
      }
    : {
        mode: 'dark' as const,
        primary: {
          main: '#64B5F6',
          light: '#90CAF9',
          dark: '#2196F3',
          contrastText: '#1A202C',
        100: '#0b3d7e',
        },
        secondary: {
          main: '#424242',
          light: '#616161',
          dark: '#212121',
          contrastText: '#E0E0E0',
        },
        error: {
          main: '#EF5350',
        },
        warning: {
          main: '#FFA726',
        },
        info: {
          main: '#90CAF9',
        },
        success: {
          main: '#81C784',
        },
        background: {
          default: '#121212',
          paper: '#1E1E1E',
        },
        text: {
          primary: '#E0E0E0',
          secondary: '#A0AEC0',
          disabled: '#616161',
        },
        divider: '#424242',
      };

  return createTheme({
    palette,
    ...commonThemeOptions,
  });
};

const theme = getAppTheme('light');
export default theme;