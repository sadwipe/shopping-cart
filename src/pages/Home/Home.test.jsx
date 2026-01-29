import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import Home from './Home';

describe('Home', () => {
  it('renders the welcome heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /welcome to mineretro shop/i }),
    ).toBeInTheDocument();
  });

  it('renders a link to the shop page', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', {
      name: /\[ enter the shop/i,
    });

    expect(link).toHaveAttribute('href', '/shop');
  });
});
