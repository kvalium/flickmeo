import { Alert, AlertColor, Snackbar } from '@mui/material';
import React from 'react';

export const Toast = ({
  open,
  message,
  duration = 5000,
  type = 'info',
}: {
  open: boolean;
  message: string;
  duration?: number;
  type?: AlertColor;
}) => {
  return (
    <Snackbar open={open} autoHideDuration={duration}>
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  );
};
