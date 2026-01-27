import { describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router';

import CustomNavLink from './CustomNavLink';

describe('CustomNavLink', () => {
  it('expect link to render', () => {
    render(
      <MemoryRouter>
        <CustomNavLink to='/shop'>Shop</CustomNavLink>
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument();
  });

  it('navigates to route when clicking', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <CustomNavLink to='/shop'>Shop</CustomNavLink>
        <Routes>
          <Route path='/shop' element={<h1>Shop Page</h1>} />
          <Route path='/' element={<h1>Home Page</h1>} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: /shop/i }));

    expect(screen.getByText('Shop Page')).toBeInTheDocument();

    expect(screen.getByText(/shop page/i)).toBeInTheDocument();
  });
});
