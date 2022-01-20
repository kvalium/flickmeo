import { render, screen } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { App } from './App';

test('Link changes the class when hovered', () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  );
  expect(screen.getByText('Flickr & Vimeo bookmark manager'));
});
