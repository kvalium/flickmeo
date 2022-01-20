import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddButton } from '../common/AddButton';
import { useSaveTag } from './TagsApi';
import { Toast } from '../common/Toast';

export const TagAddForm = ({ bookmarkId }: { bookmarkId: string }) => {
  const [tagName, setTagName] = useState<string>();
  const { mutate: addNewTag, isLoading, isError } = useSaveTag(bookmarkId);

  const { t } = useTranslation();

  return (
    <>
      <Toast open={isError} type="warning" message={t('An error occurs while adding tag')} />
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <TextField
            onChange={(e) => setTagName(e.target.value)}
            fullWidth
            label={t('Tag name')}
            variant="outlined"
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={1}>
          <AddButton
            onClick={() => tagName && addNewTag(tagName)}
            disabled={!tagName || isLoading}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
