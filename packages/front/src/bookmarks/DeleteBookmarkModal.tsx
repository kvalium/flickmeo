import { Box, Modal } from '@mui/material';
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
        <div>
          <button onClick={onClose}>{t('Cancel')}</button>
          <button onClick={onConfirm}>{t('Ok')}</button>
        </div>
      </Box>
    </Modal>
  );
};
