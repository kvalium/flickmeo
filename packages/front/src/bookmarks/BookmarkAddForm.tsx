import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRetrieveLinkInfo } from './BookmarksApi';

export const BookmarkAddForm = () => {
  const [link, setLink] = useState<string>();
  const { t } = useTranslation();
  const [fieldValue, setFieldValue] = useState<string>();
  const { isLoading, error, data: result } = useRetrieveLinkInfo(link);

  if (error) {
    console.log({ error });
  }

  return (
    <>
      <TextField
        onChange={(e) => setFieldValue(e.target.value)}
        fullWidth
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        disabled={isLoading}
      />
      <LoadingButton
        loading={isLoading}
        disabled={!fieldValue}
        onClick={() => setLink(fieldValue)}
        variant="contained"
        color="success"
      >
        {t('Add bookmark')}
      </LoadingButton>
    </>
  );
};
