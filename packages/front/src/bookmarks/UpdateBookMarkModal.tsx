import { Box, Modal } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSaveTag } from '../tags/TagsApi';
import { TagsList } from '../tags/TagsList';

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

export const UpdateBookmarkModal = ({
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
  const [tagName, setTagName] = useState<string>();
  const { mutate: addNewTag } = useSaveTag(bookmarkId);

  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <input type="text" name="tagName" onChange={(e) => setTagName(e.target.value)} />
        <button onClick={() => tagName && addNewTag(tagName)}>{t('add new tag')}</button>
        <TagsList bookmarkId={bookmarkId} />
        <div>
          <button onClick={onClose}>{t('Cancel')}</button>
          <button onClick={onUpdate}>{t('Update')}</button>
        </div>
      </Box>
    </Modal>
  );
};
