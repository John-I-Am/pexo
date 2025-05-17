import { expect, vi } from 'vitest';
import { render, screen } from '@/test-utils';
import { ContextSetup } from '@/test-utils/components/ContextSetup';
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
    IconSquareNumber4Filled: () => <MockIcon data-testid="icon-4" />,
    IconSquareNumber5Filled: () => <MockIcon data-testid="icon-5" />,
    IconSquareNumber6Filled: () => <MockIcon data-testid="icon-6" />,
    IconSquareNumber7Filled: () => <MockIcon data-testid="icon-7" />,
    IconSquareNumber8Filled: () => <MockIcon data-testid="icon-8" />,
    IconSquareNumber9Filled: () => <MockIcon data-testid="icon-9" />,
    IconSquareNumber0Filled: () => <MockIcon data-testid="icon-0" />,
    IconChevronRight: () => <svg data-testid="chevron-icon" />,
  };
});

describe('OverviewDisplay', () => {
  it('renders correct icons based on goal', () => {
    render(<OverviewDisplay decks={[]} goal={123} />);
    const icon1 = screen.getByTestId('icon-1');
    const icon2 = screen.getByTestId('icon-2');
    const icon3 = screen.getByTestId('icon-3');
    const icon4 = screen.queryByTestId('icon-4');
    expect(icon1).toBeDefined();
    expect(icon2).toBeDefined();
    expect(icon3).toBeDefined();
    expect(icon4).toBeNull();
  });
  it('displays the correct number of active decks visually', () => {
    const decks: any = [
      { id: 'deck-1', name: 'Deck 1', cards: [] },
      { id: 'deck-2', name: 'Deck 2', cards: [] },
    ];

    render(
      <ContextSetup>
        <OverviewDisplay decks={decks} goal={123} />
      </ContextSetup>
    );

    const deckCount = screen.getByText((_, element) => element?.textContent === 'Active decks 2');
    expect(deckCount).toBeInTheDocument();
  });
});
