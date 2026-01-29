import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

import Dropdown from './Dropdown';
import ShopContext from '../../../context/ShopContext';

describe('Dropdown', () => {
  // Mock functions for props and context
  let mockSetSortingOption;
  let mockSetIsOpen;
  let mockSortItems;
  let user;

  // Helper
  const renderDropdown = () =>
    render(
      <ShopContext.Provider value={{ sortItems: mockSortItems }}>
        <Dropdown
          setSortingOption={mockSetSortingOption}
          setIsOpen={mockSetIsOpen}
        />
      </ShopContext.Provider>,
    );

  // Before each test, mock functions and set the user
  beforeEach(() => {
    mockSetSortingOption = vi.fn();
    mockSetIsOpen = vi.fn();
    mockSortItems = vi.fn();
    user = userEvent.setup();
  });

  it('disappears when an option is clicked', async () => {
    renderDropdown();

    const button = screen.getByRole('button', { name: /alphabetical: a-z/i });

    await user.click(button);

    // Verify the disappearing logic, setIsOpen() should be called with "false"
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('calls sorting functions with correct arguments', async () => {
    renderDropdown();

    const button = screen.getByRole('button', { name: /alphabetical: a-z/i });

    await user.click(button);

    // Verify if the functions were called with correct arguments
    expect(mockSortItems).toHaveBeenCalledWith('Alphabetical: A-Z');
    expect(mockSetSortingOption).toHaveBeenCalledWith('Alphabetical: A-Z');
  });
});
