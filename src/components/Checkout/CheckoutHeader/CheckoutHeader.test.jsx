import { render, screen } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import CheckoutHeader from './CheckoutHeader';

describe('CheckoutHeader', () => {
  it('renders checkouth header elements', () => {
    render(<CheckoutHeader />);
    const item = screen.getByText(/item/i);
    const quantity = screen.getByText(/quantity/i);
    const total = screen.getByText(/total/i);

    expect(item).toBeInTheDocument();
    expect(quantity).toBeInTheDocument();
    expect(total).toBeInTheDocument();
  });
});
