import { Container, Stack } from '@mui/material';
import React from 'react';
import { BookmarkAddForm } from './bookmarks/BookmarkAddForm';
import { BookmarksList } from './bookmarks/BookmarksList';

export const App = () => {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Stack spacing={2}>
        <BookmarkAddForm />
        <BookmarksList />
      </Stack>
    </Container>
  );
};
