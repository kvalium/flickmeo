import AddIcon from '@mui/icons-material/Add';
import { CircularProgress, Fab } from '@mui/material';
import { green } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';

export const AddButton = ({
  onClick,
  disabled = false,
  isLoading = false,
}: {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}) => (
  <Box sx={{ position: 'relative' }}>
    <Fab color="secondary" aria-label="add" disabled={disabled} size="large" onClick={onClick}>
      <AddIcon />
    </Fab>
    {isLoading && (
      <CircularProgress
        size={68}
        sx={{
          color: green[500],
          position: 'absolute',
          top: -6,
          left: -6,
          zIndex: 1,
        }}
      />
    )}
  </Box>
);
