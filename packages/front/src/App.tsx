import { Container, Box } from '@mui/material';
import React from 'react';
import { BookmarkAddForm } from './bookmarks/BookmarkAddForm';
import { BookmarksList } from './bookmarks/BookmarksList';

export const App = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <BookmarksList />
        <BookmarkAddForm />
      </Box>
    </Container>
  );
};
