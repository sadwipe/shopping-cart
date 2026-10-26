import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ShopContext from '../../../context/ShopContext';
import ShopItemsList from './ShopItemsList';

// Mock ShopItem
vi.mock('../../../components/Shop/ShopItem/ShopItem', () => ({
  default: ({ item }) => <li data-testid='shop-item'>{item.name}</li>,
}));

// Helper
const renderWithContext = (value) =>
  render(
    <ShopContext.Provider value={value}>
      <ShopItemsList />
    </ShopContext.Provider>,
  );

// Tests
describe('ShopItemsList', () => {
  it('renders empty state when items is empty', () => {
    renderWithContext({ items: [], error: null });

    expect(screen.getByText(/no items available/i)).toBeInTheDocument();
  });

  it('renders empty state when items is undefined', () => {
    renderWithContext({ items: undefined, error: null });

    expect(screen.getByText(/no items available/i)).toBeInTheDocument();
  });

  it('renders a list of shop items when items exist', () => {
    renderWithContext({
      items: [
        { id: 1, name: 'Diamond Sword' },
        { id: 2, name: 'Emerald Block' },
      ],
      error: null,
    });

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByTestId('shop-item')).toHaveLength(2);
  });
});
