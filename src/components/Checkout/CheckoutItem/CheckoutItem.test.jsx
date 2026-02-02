import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import CheckoutItem from './CheckoutItem';
import userEvent from '@testing-library/user-event';

describe('CheckoutItem', () => {
  const mockSetCartItems = vi.fn();
  const mockItem = {
    id: 1,
    name: 'Healing Potion',
    quantity: 2,
    cost: 50,
    image: 'potion.png',
  };
  const mockCartItems = [mockItem];

  it('calculates the subtotal correctly', () => {
    render(
      <CheckoutItem
        item={mockItem}
        cartItems={mockCartItems}
        setCartItems={mockSetCartItems}
      />,
    );
    // 50 * 2 = 100
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('does not decrease quantity below 1', async () => {
    const user = userEvent.setup();
    const mockSetCartItems = vi.fn();

    const lowQtyItem = { ...mockItem, quantity: 1 };

    render(
      <CheckoutItem
        item={lowQtyItem}
        cartItems={[lowQtyItem]}
        setCartItems={mockSetCartItems}
      />,
    );

    const minusBtn = screen.getByAltText('decrease button');

    await user.click(minusBtn);

    expect(mockSetCartItems).not.toHaveBeenCalled();
  });

  it('removes only the target item when multiple items exist', async () => {
    const user = userEvent.setup();
    const mockSetCartItems = vi.fn();

    const item1 = { id: 1, name: 'Healing Potion', quantity: 1, cost: 50 };
    const item2 = { id: 2, name: 'Mana Potion', quantity: 1, cost: 40 };
    const multiItemCart = [item1, item2];

    render(
      <CheckoutItem
        item={item1}
        cartItems={multiItemCart}
        setCartItems={mockSetCartItems}
      />,
    );

    const removeBtn = screen.getByRole('button', { name: /remove/i });
    await user.click(removeBtn);

    // Expect the cart to still contain the Mana Potion
    expect(mockSetCartItems).toHaveBeenCalledWith([item2]);
  });
});
