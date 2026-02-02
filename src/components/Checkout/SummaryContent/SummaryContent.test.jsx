import { render, screen } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import SummaryContent from './SummaryContent';
import ShopContext from '../../../context/ShopContext';
import { MemoryRouter } from 'react-router';

const mockCartItems = [
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
  {
    name: 'Bow',
    description: 'A bow is a ranged weapon that shoots arrows.',
    image: 'https://minecraft-api.vercel.app/images/items/bow.png',
    stackSize: 1,
    renewable: true,
    cost: 8,
    id: 'bow',
    quantity: 6,
  },
  {
    name: 'Beacon',
    description:
      'A beacon is a block that projects a light beam skyward and can provide status effects such as Speed, Jump Boost, Haste, Regeneration, Resistance, or Strength to nearby players.',
    image: 'https://minecraft-api.vercel.app/images/items/beacon.png',
    stackSize: 64,
    renewable: true,
    cost: 64,
    id: 'beacon',
    quantity: 4,
  },
  {
    name: 'Elytra',
    description:
      'Elytra ( /ˈɛl ɪ trə/ ᴇʟ-i-trə) are rare wings found in end ships that are the only single-item source of flight in Survival mode.',
    image: 'https://minecraft-api.vercel.app/images/items/elytra.png',
    stackSize: 1,
    renewable: false,
    cost: 48,
    id: 'elytra',
    quantity: 2,
  },
];

const renderWithContext = (items = mockCartItems) => {
  const length = items.reduce((acc, item) => acc + item.quantity, 0);
  return render(
    <MemoryRouter>
      <ShopContext.Provider
        value={{ cartItems: items, cartItemsLength: length }}
      >
        <SummaryContent />
      </ShopContext.Provider>
    </MemoryRouter>,
  );
};

describe('SummaryContent', () => {
  it('expect to render a link for checkout', () => {
    renderWithContext();

    const link = screen.getByRole('link', { name: /checkout/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('calculates and displays the correct total price', () => {
    renderWithContext();

    const totalPriceDisplay = screen.getByText(/1624/);
    expect(totalPriceDisplay).toBeInTheDocument();
  });

  it('renders an emerald icon with correct alt text', () => {
    renderWithContext();

    const icon = screen.getByAltText('emerald icon');
    expect(icon).toBeInTheDocument();
  });
});
