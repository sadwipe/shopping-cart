import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ShopContext from '../../context/ShopContext';
import Checkout from './Checkout';

// Mock child components

vi.mock('../../components/Checkout/EmptyCart/EmptyCart', () => ({
  default: () => <div data-testid='empty-cart' />,
}));

vi.mock('../../components/Checkout/CheckoutItemList/CheckoutItemsList', () => ({
  default: () => <div data-testid='checkout-items-list' />,
}));

vi.mock('../../components/Checkout/SummaryContent/SummaryContent', () => ({
  default: () => <div data-testid='summary-content' />,
}));

describe('Cart (Checkout page)', () => {
  it('renders EmptyCart when cart is empty', () => {
    render(
      <ShopContext.Provider
        value={{
          cartItems: [],
          setCartItems: vi.fn(),
        }}
      >
        <Checkout />
      </ShopContext.Provider>,
    );

    expect(screen.getByTestId('empty-cart')).toBeInTheDocument();
    expect(screen.queryByTestId('checkout-items-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('summary-content')).not.toBeInTheDocument();
  });

  it('renders checkout items and summary when cart has items', () => {
    render(
      <ShopContext.Provider
        value={{
          cartItems: [{ id: 1, name: 'Diamond Sword' }],
          setCartItems: vi.fn(),
        }}
      >
        <Checkout />
      </ShopContext.Provider>,
    );

    expect(screen.getByTestId('checkout-items-list')).toBeInTheDocument();

    expect(screen.getByTestId('summary-content')).toBeInTheDocument();

    expect(screen.queryByTestId('empty-cart')).not.toBeInTheDocument();
  });
});
