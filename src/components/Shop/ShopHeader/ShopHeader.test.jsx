import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ShopHeader from './ShopHeader';
import ShopContext from '../../../context/ShopContext';

// Mock Dropdown
vi.mock('../Dropdown/Dropdown', () => ({
  default: () => <div data-testid='dropdown' />,
}));

// Helper
const renderWithContext = (items) =>
  render(
    <ShopContext.Provider value={{ items }}>
      <ShopHeader />
    </ShopContext.Provider>,
  );

// Tests
describe('ShopHeader', () => {
  it('renders shop title', () => {
    renderWithContext([]);
    expect(screen.getByRole('heading', { name: /shop/i })).toBeInTheDocument();
  });

  it('renders sorting button', () => {
    renderWithContext([]);
    expect(
      screen.getByRole('button', { name: /sort: alphabetical: a-z/i }),
    ).toBeInTheDocument();
  });

  it('renders item count correctly for zero items', () => {
    renderWithContext([]);
    expect(screen.getByText(/0 items/i)).toBeInTheDocument();
  });

  it('renders item count correctly for one item', () => {
    renderWithContext([{}]);
    expect(screen.getByText(/1 Item/i)).toBeInTheDocument();
  });

  it('renders item count correctly for multiple items', () => {
    renderWithContext([{}, {}]);
    expect(screen.getByText(/2 items/i)).toBeInTheDocument();
  });

  it('renders sort button with default option and chevron down', () => {
    renderWithContext([]);
    const button = screen.getByRole('button', {
      name: /sort: alphabetical: a-z/i,
    });
    expect(button).toBeInTheDocument();

    // Chevron down should exist (class check)
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
  });

  it('toggles Dropdown on sort button click', async () => {
    const user = userEvent.setup();

    renderWithContext([]);
    const button = screen.getByRole('button', {
      name: /sort: alphabetical: a-z/i,
    });

    // Initially not visible
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();

    // Click to open
    await user.click(button);
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();

    // Click to close
    await user.click(button);
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  });

  it('toggles chevron up/down when dropdown is open/closed', async () => {
    const user = userEvent.setup();

    renderWithContext([]);
    const button = screen.getByRole('button', {
      name: /sort: alphabetical: a-z/i,
    });

    // Initially chevron-down visible, chevron-up not
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    expect(screen.queryByTestId('chevron-up')).not.toBeInTheDocument();

    // Click to open
    await user.click(button);
    expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
    expect(screen.queryByTestId('chevron-down')).not.toBeInTheDocument();

    // Click to close
    await user.click(button);
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    expect(screen.queryByTestId('chevron-up')).not.toBeInTheDocument();
  });
});
