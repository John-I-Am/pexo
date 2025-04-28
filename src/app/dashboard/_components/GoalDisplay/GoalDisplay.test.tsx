import { expect, test, vi } from 'vitest';
import { GoalDisplay } from './GoalDisplay';
import { render, screen } from '@/test-utils';

vi.mock('next/font/local', () => ({
  default: vi.fn(() => ({
    style: {
      fontFamily: 'mock-font-family',
    },
  })),
}));

test('GoalDisplay', () => {
  render(
    <GoalDisplay cards={[]} sessionLog={{ goal: 50, id: '40', userId: '30', date: new Date() }} />
  );
  expect(screen.getByRole('heading', { level: 2, name: "Today's goals" })).toBeDefined();
});
