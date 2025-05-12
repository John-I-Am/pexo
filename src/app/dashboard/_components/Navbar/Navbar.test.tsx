import { expect, vi } from 'vitest';
import { accountPath, collectionsPath, dashboardPath, studyPath } from '@/lib/paths';
import { render, screen } from '@/test-utils';
import { Navbar } from './Navbar';

vi.mock('next/font/local', () => ({
  default: vi.fn(() => ({
    style: {
      fontFamily: 'mock-font-family',
    },
  })),
}));

vi.mock('next/navigation', async () => {
  return {
    usePathname: vi.fn(() => '/dashboard'),
    useRouter: () => ({
      push: vi.fn(),
    }),
  };
});

vi.mock('@/lib/betterAuth/authClient', () => ({
  authClient: { signOut: vi.fn() },
}));

describe('Navbar', () => {
  it('renders NavLinks with correct hrefs and active state', () => {
    render(<Navbar user="user@example.com" isDrawer={false} />);

    const studyLink = screen.getByRole('link', { name: 'Study' });
    const dashboardLink = screen.getByRole('link', { name: 'Dashboard' });
    const collectionsLink = screen.getByRole('link', { name: 'Collections' });
    const accountLink = screen.getByRole('link', { name: 'Account' });

    expect(studyLink).toHaveAttribute('href', studyPath());
    expect(dashboardLink).toHaveAttribute('href', dashboardPath());
    expect(collectionsLink).toHaveAttribute('href', collectionsPath());
    expect(accountLink).toHaveAttribute('href', accountPath());
  });

  it('renders correct useranme', () => {
    render(<Navbar user="user@example.com" isDrawer={false} />);
    expect(screen.getByText('user@example.com')).toBeDefined();
  });
});
