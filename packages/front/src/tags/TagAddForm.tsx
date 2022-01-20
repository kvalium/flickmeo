import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddButton } from '../common/AddButton';
import { useSaveTag } from './TagsApi';

export const TagAddForm = ({ bookmarkId }: { bookmarkId: string }) => {
  const [tagName, setTagName] = useState<string>();
  const { mutate: addNewTag, isLoading, error } = useSaveTag(bookmarkId);

  const { t } = useTranslation();

  if (error) {
    <p>ERROR: {error}</p>;
  }

  return (
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
  );
};
