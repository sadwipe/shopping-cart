import { describe, expect, it, vi } from 'vitest';
import { screen, render, act } from '@testing-library/react';
import { beforeEach, afterEach } from 'vitest';

import Footer from './Footer';

describe('Footer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders footer elements', () => {
    render(<Footer />);

    const footerText = screen.getByText(/mode: survival/i);
    const footerTimer = screen.getByText(/\d{2}:\d{2}:\d{2}/);

    expect(footerText).toBeInTheDocument();
    expect(footerTimer).toBeInTheDocument();
  });

  it('updates time every second', () => {
    render(<Footer />);

    const firstTime = screen.getByText(/\d{2}:\d{2}:\d{2}/).textContent;

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const updatedTime = screen.getByText(/\d{2}:\d{2}:\d{2}/).textContent;

    expect(updatedTime).not.toBe(firstTime);
  });
});
