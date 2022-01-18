import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: blue.A400,
    },
  },
});

export default theme;
