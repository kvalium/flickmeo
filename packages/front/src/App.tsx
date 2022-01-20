import { Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookmarkAddForm } from './bookmarks/BookmarkAddForm';
import { BookmarksList } from './bookmarks/BookmarksList';
import theme from './theme';

export const App = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box sx={{ marginBottom: 5 }}>
        <Typography variant="h2" component="span" sx={{ marginRight: 2 }}>
          {t('Flickmeo')}
        </Typography>
        <Typography variant="h5" component="span">
          {t('Flickr & Vimeo bookmark manager')}
        </Typography>
      </Box>
      <Stack spacing={2}>
        <Box sx={{ marginBottom: 2 }}>
          <BookmarkAddForm />
        </Box>
        <BookmarksList />
      </Stack>
    </Container>
  );
};
