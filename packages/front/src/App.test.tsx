import React from 'react';
import renderer from 'react-test-renderer';
import { App } from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
});
