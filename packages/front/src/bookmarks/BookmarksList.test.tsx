import React from 'react';
import { render, screen } from '@testing-library/react';
import { BookmarksList } from './BookmarksList';

test('renders learn react link', () => {
  render(<BookmarksList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
