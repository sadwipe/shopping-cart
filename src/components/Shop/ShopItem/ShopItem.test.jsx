import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ShopItem from './ShopItem';
import * as utils from '../../../utils/shopUtils';

// Mock AddToCart
vi.mock('../AddToCart/AddToCart', () => ({
  default: ({ item }) => <button data-testid='add-to-cart'>{item.name}</button>,
}));

// Tests
describe('ShopItem', () => {
  const mockItem = {
    id: 1,
    name: 'Diamond Sword',
    description: 'This is a very powerful sword used in Minecraft.',
    image: '/diamond-sword.png',
  };

  it('renders image, title, description, and AddToCart', () => {
    // Mock summarizeDescription to return a simple string
    vi.spyOn(utils, 'summarizeDescription').mockImplementation(
      (desc) => `Summary: ${desc}`,
    );

    render(<ShopItem item={mockItem} />);

    // Image
    const img = screen.getByRole('img', { name: /diamond sword/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockItem.image);

    // Title
    expect(
      screen.getByRole('heading', { name: /diamond sword/i }),
    ).toBeInTheDocument();

    // Description
    expect(
      screen.getByText(/summary: this is a very powerful sword/i),
    ).toBeInTheDocument();

    // AddToCart
    expect(screen.getByTestId('add-to-cart')).toBeInTheDocument();

    // Restore the spy
    utils.summarizeDescription.mockRestore();
  });
});
