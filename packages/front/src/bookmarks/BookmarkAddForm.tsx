import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Toast } from '../common/Toast';
import { useAddBookmark } from './BookmarksApi';
// import { useRetrieveLinkInfo } from './BookmarksApi';

export const BookmarkAddForm = () => {
  const { t } = useTranslation();
  const [fieldValue, setFieldValue] = useState<string>();
  const { mutate: addBookmark, isLoading, isError } = useAddBookmark();

  return (
    <>
      <Toast open={isError} message={'error'} />
      <TextField
        onChange={(e) => setFieldValue(e.target.value)}
        fullWidth
        id="outlined-basic"
        label={t('Vimeo or Flickr link')}
        variant="outlined"
        disabled={isLoading}
      />
      <LoadingButton
        loading={isLoading}
        disabled={!fieldValue}
        onClick={() => fieldValue && addBookmark(fieldValue)}
        variant="contained"
        color="success"
      >
        {t('Add bookmark')}
      </LoadingButton>
    </>
  );
};
