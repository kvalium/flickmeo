import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddButton } from '../common/AddButton';
import { Toast } from '../common/Toast';
import { useAddBookmark } from './BookmarksApi';

export const BookmarkAddForm = () => {
  const { t } = useTranslation();
  const [fieldValue, setFieldValue] = useState<string>();
  const { mutate: addBookmark, isLoading, isError } = useAddBookmark();

  return (
    <>
      <Toast
        open={isError}
        type="warning"
        message={t('An error occurs while adding the bookmark')}
      />
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <TextField
            onChange={(e) => setFieldValue(e.target.value)}
            fullWidth
            id="outlined-basic"
            label={t('Vimeo or Flickr link')}
            variant="outlined"
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={1}>
          <AddButton
            onClick={() => fieldValue && addBookmark(fieldValue)}
            disabled={!fieldValue || isLoading}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
