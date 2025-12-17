import { describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router';

import Header from './Header';

describe('Header', () => {
  it('renders header elements', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const headerLogo = screen.getByAltText(/logo icon/i);
    const headerCart = screen.getByAltText(/checkout icon/i);
    const headerButton = screen.getByText('Shop');

    expect(headerLogo).toBeInTheDocument();
    expect(headerButton).toBeInTheDocument();
    expect(headerCart).toBeInTheDocument();
  });

  it('navigatest to home when clicking logo', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/shop']}>
        <Header />
        <Routes>
          <Route path='/shop' element={<h1>Shop Page</h1>} />
          <Route path='/' element={<h1>Home Page</h1>} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByTestId('header-logo'));

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('navigates to shop when clicking shop link', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
        <Routes>
          <Route path='/shop' element={<h1>Shop Page</h1>} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('link', { name: /shop/i }));

    expect(screen.getByText('Shop Page')).toBeInTheDocument();
  });

  it('navigates to checkout when clicking checkout icon', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
        <Routes>
          <Route path='/checkout' element={<h1>Checkout Page</h1>} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByTestId('checkout-logo'));
    expect(screen.getByText('Checkout Page')).toBeInTheDocument();
  });
});
