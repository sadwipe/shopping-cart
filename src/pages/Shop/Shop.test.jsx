import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Shop from './Shop';

vi.mock('../../components/Shop/ShopHeader/ShopHeader', () => ({
  default: () => <div data-testid='shop-header' />,
}));

vi.mock('../../components/Shop/ShopItemsList/ShopItemsList', () => ({
  default: () => <div data-testid='shop-items-list' />,
}));

describe('Shop Component', () => {
  it('renders the standard shop layout', () => {
    render(<Shop />);

    // Assert that the container structure exists
    expect(screen.getByTestId('shop-header')).toBeInTheDocument();
    expect(screen.getByTestId('shop-items-list')).toBeInTheDocument();
  });
});
