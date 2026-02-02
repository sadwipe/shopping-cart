import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

import CheckoutItemsList from './CheckoutItemsList';

const mockedSetCartItems = vi.fn();
const mockedCartItems = [
  {
    name: 'Enchanted Book',
    description:
      'An enchanted book is an item that lets players add enchantments to certain items using an anvil.',
    image: 'https://minecraft-api.vercel.app/images/items/enchanted_book.gif',
    stackSize: 1,
    renewable: true,
    cost: 16,
    id: 'enchanted_book',
    quantity: 12,
  },
  {
    name: 'Nether Star',
    description:
      'The nether star is a rare item dropped by the wither that is used solely to craft beacons.',
    image: 'https://minecraft-api.vercel.app/images/items/nether_star.gif',
    stackSize: 64,
    renewable: true,
    cost: 64,
    id: 'nether_star',
    quantity: 13,
  },
  {
    name: 'Shulker Box',
    description: 'A shulker box is a block that can store and transport items.',
    image: 'https://minecraft-api.vercel.app/images/items/shulker_box.png',
    stackSize: 1,
    renewable: true,
    cost: 20,
    id: 'shulker_box',
    quantity: 10,
  },
];

describe('CheckoutItemsList', () => {
  it('renders header and the empty list', () => {
    render(
      <CheckoutItemsList cartItems={[]} setCartItems={mockedSetCartItems} />,
    );

    // Header render
    expect(screen.getByText(/item/i)).toBeInTheDocument();
    expect(screen.getByText(/quantity/i)).toBeInTheDocument();
    expect(screen.getByText(/total/i)).toBeInTheDocument();

    // List render
    expect(screen.getByRole('list')).toBeInTheDocument();

    // We should not have any <li> since we passed an empty array
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('renders list items with correct names', () => {
    render(
      <CheckoutItemsList
        cartItems={mockedCartItems}
        setCartItems={mockedSetCartItems}
      />,
    );

    // we should have 3 <li> items
    expect(screen.getAllByRole('listitem')).toHaveLength(3);

    // test names of li items
    expect(screen.getByText('Enchanted Book')).toBeInTheDocument();
    expect(screen.getByText('Nether Star')).toBeInTheDocument();
    expect(screen.getByText('Shulker Box')).toBeInTheDocument();
  });

  vi.mock('../CheckoutItem/CheckoutItem', () => ({
    default: ({ item, setCartItems }) => (
      <li>
        {item.name}
        <button onClick={() => setCartItems('clicked')}>Mock Remove</button>
      </li>
    ),
  }));

  it('correctly passes setCartItems down to children', async () => {
    const user = userEvent.setup();
    const mockFn = vi.fn();
    const items = [{ id: 1, name: 'Potion' }];

    render(<CheckoutItemsList cartItems={items} setCartItems={mockFn} />);

    // Click the mock button
    await user.click(screen.getByText('Mock Remove'));

    expect(mockFn).toHaveBeenCalledWith('clicked');
  });
});
