import { Box, Button, Grid, Modal } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  backgroundColor: '#222',
};

export const DeleteBookmarkModal = ({
  show,
  onClose,
  onConfirm,
}: {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <p>{t('do you really want to delete this item?')}</p>
        <Grid container>
          <Grid item>
            <Button onClick={onClose}>{t('Cancel')}</Button>
          </Grid>
          <Grid item>
            <Button onClick={onConfirm}>{t('Ok')}</Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
