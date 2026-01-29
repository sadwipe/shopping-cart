import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import ShopContext from '../../../context/ShopContext';

import AddToCart from './AddToCart';

const mockSetCartItems = vi.fn();

const renderWithContext = (item) =>
  render(
    <ShopContext.Provider value={{ setCartItems: mockSetCartItems }}>
      <AddToCart item={item} />
    </ShopContext.Provider>,
  );

describe('AddToCart', () => {
  let mockItem;
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    mockItem = {
      id: 1,
      name: 'Diamond Sword',
      description: 'This is a very powerful sword used in Minecraft.',
      image: '/diamond-sword.png',
      cost: 20,
    };
  });

  it('renders with correct input value and price', () => {
    render(<AddToCart item={mockItem} />);

    const inputElement = screen.getByRole('spinbutton');

    // initial value of the input should be 0
    expect(inputElement).toHaveValue(0);

    // test price
    expect(screen.getByText(mockItem.cost.toString())).toBeInTheDocument();
  });

  it('updates input value when we press buttons', async () => {
    render(<AddToCart item={mockItem} />);

    const inputElement = screen.getByRole('spinbutton');

    const minus = screen.getByAltText(/decrease button/i);
    const plus = screen.getByAltText(/increase button/i);

    // if input value is 0 and we press decrease, we should have 0
    await user.click(minus);
    expect(inputElement).toHaveValue(0);

    // the value of the input should be 1 after we press increase button
    await user.click(plus);
    expect(inputElement).toHaveValue(1);

    // the value of the input should be 0 after we press decrease button
    await user.click(minus);
    expect(inputElement).toHaveValue(0);

    // if input value is 100 and we press increase, we should have 100\
    await user.clear(inputElement);
    await user.type(inputElement, '100');
    await user.click(plus);
    expect(inputElement).toHaveValue(100);
  });

  it('sanitizes and clamps manual keyboard input', async () => {
    render(<AddToCart item={mockItem} />);

    const inputElement = screen.getByRole('spinbutton');

    // typing a valid number updates input
    await user.type(inputElement, '5');
    expect(inputElement).toHaveValue(5);

    // typing a number over 100 triggers clamp (sets to 100)
    await user.clear(inputElement);
    await user.type(inputElement, '101');
    expect(inputElement).toHaveValue(100);

    // typing a number lower than 0 triggers clamp (sets to 0)
    await user.clear(inputElement);
    await user.type(inputElement, '-2');
    expect(inputElement).toHaveValue(0);

    // leaving the input empty and clicking away resets the value to 0.
    await user.clear(inputElement);
    await user.tab();
    expect(inputElement).toHaveValue(0);
  });

  it('should not call setCartItems if quantity is 0', async () => {
    renderWithContext(mockItem);

    const button = screen.getByRole('button');

    await user.click(button);

    expect(mockSetCartItems).not.toBeCalled();
  });

  it('should call setCartItems with the item and selected quantity', async () => {
    renderWithContext(mockItem);

    const plus = screen.getByAltText(/increase button/i);

    const button = screen.getByRole('button');

    // increased quantity by 1
    await user.click(plus);

    await user.click(button);

    expect(mockSetCartItems).toBeCalled();

    const updaterFunction = mockSetCartItems.mock.calls[0][0];

    const result = updaterFunction([]);

    expect(result).toContainEqual({
      ...mockItem,
      quantity: 1,
    });
  });

  it('should set quantity 0 after pressing the button with a valid amount', async () => {
    renderWithContext(mockItem);
    const inputElement = screen.getByRole('spinbutton');
    const plus = screen.getByAltText(/increase button/i);
    const button = screen.getByRole('button');

    // increased quantity by 1
    await user.click(plus);
    expect(inputElement).toHaveValue(1);

    // should return to 0
    await user.click(button);
    expect(inputElement).toHaveValue(0);
  });
});
