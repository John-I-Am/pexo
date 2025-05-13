import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@/test-utils';
import { Deck } from './Deck';

vi.mock('next/font/local', () => ({
  default: vi.fn(() => ({
    style: {
      fontFamily: 'mock-font-family',
    },
  })),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('Deck component', () => {
  it('renders title, description, and tags', () => {
    render(
      <Deck
        id="deck1"
        title="Sample Deck"
        description="A test description"
        tags={['tag1', 'tag2']}
        cards={[]}
      />
    );

    expect(screen.getByText('Sample Deck')).toBeInTheDocument();
    expect(screen.getByText('A test description')).toBeInTheDocument();
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('renders Add button if isPrebuilt is true', () => {
    render(
      <Deck
        id="deck2"
        title="Prebuilt"
        description="Prebuilt description"
        tags={[]}
        cards={[]}
        isPrebuilt
      />
    );

    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.queryByTestId('progress-bar')).not.toBeInTheDocument();
  });

  it('renders ProgressBar if isPrebuilt is false', () => {
    render(<Deck id="deck3" title="User Deck" description="User's deck" tags={[]} cards={[]} />);

    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /add/i })).not.toBeInTheDocument();
  });
});
