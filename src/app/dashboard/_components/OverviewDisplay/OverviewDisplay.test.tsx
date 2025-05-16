import { vi } from 'vitest';
import { render, screen } from '@/test-utils';
import { OverviewDisplay } from './OverviewDisplay';

vi.mock('next/font/local', () => ({
  default: vi.fn(() => ({
    style: {
      fontFamily: 'mock-font-family',
    },
  })),
}));

vi.mock('@tabler/icons-react', () => {
  const MockIcon = ({ 'data-testid': testId }: { 'data-testid': string }) => (
    <svg data-testid={testId} />
  );
  return {
    IconSquareNumber1Filled: () => <MockIcon data-testid="icon-1" />,
    IconSquareNumber2Filled: () => <MockIcon data-testid="icon-2" />,
    IconSquareNumber3Filled: () => <MockIcon data-testid="icon-3" />,
    IconSquareNumber0Filled: () => <MockIcon data-testid="icon-0" />,
    IconChevronRight: () => <svg data-testid="chevron-icon" />,
  };
});

describe('OverviewDisplay', () => {
  it('renders correct icons based on goal', () => {
    render(<OverviewDisplay decks={[]} goal={123} />);

    const icon1 = screen.getByTestId('icon-1');
    assert.exists(icon1);
  });
});
