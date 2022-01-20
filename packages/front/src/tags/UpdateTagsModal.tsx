import { Box, Button, Grid, Modal, Stack } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TagAddForm } from './TagAddForm';
import { TagsList } from './TagsList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  backgroundColor: '#222',
};

export const UpdateTagsModal = ({
  show,
  bookmarkId,
  onClose,
  onUpdate,
}: {
  show: boolean;
  bookmarkId: string;
  onClose: () => void;
  onUpdate: () => void;
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
        <Stack spacing={5}>
          <TagAddForm bookmarkId={bookmarkId} />
          <TagsList bookmarkId={bookmarkId} />
          <Button onClick={onClose}>{t('Ok')}</Button>
        </Stack>
      </Box>
    </Modal>
  );
};
