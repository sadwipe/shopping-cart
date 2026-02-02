import { render, screen } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import EmptyCart from './EmptyCart';
import { MemoryRouter } from 'react-router';

const renderWithContext = () =>
  render(
    <MemoryRouter>
      <EmptyCart />
    </MemoryRouter>,
  );

describe('EmptyCart', () => {
  it('renders a link that redirects to /shop', () => {
    renderWithContext();
    const link = screen.getByRole('link', { name: /Enter the Shop →/i });
    expect(link).toBeInTheDocument();
  });

  it('renders a paragraph that says your cart is empty', () => {
    renderWithContext();
    const paragraph = screen.getByText(/Your cart is empty!/i);
    expect(paragraph).toBeInTheDocument();
  });
});
