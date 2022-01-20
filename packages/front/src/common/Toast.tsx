import { Alert, AlertColor } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';

export const Toast = ({
  open,
  message,
  duration = 10,
  type = 'info',
}: {
  open: boolean;
  message: string;
  duration?: number;
  type?: AlertColor;
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={duration}
    >
      <Alert severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
