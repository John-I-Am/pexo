import { expect, vi } from 'vitest';
import { dashboardPath } from '@/lib/paths';
import { render, screen } from '@/test-utils';
import { EmptyDeck } from './EmptyDeck';

vi.mock('next/font/local', () => ({
  default: vi.fn(() => ({
    style: {
      fontFamily: 'mock-font-family',
    },
  })),
}));

describe('EmptyDeck', () => {
  it('redirects when back button is clicked', () => {
    render(<EmptyDeck />);
    const backLink = screen.getByRole('link', { name: 'Go Back' });

    expect(backLink).toHaveAttribute('href', dashboardPath());
  });
});
