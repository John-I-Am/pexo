import { Card, Prisma } from '@/generated/prisma';

export type DeckWithCards = Prisma.DeckGetPayload<{
  include: { cards: true };
}>;

export type NewCard = Omit<Card, 'id' | 'deckId' | 'reviewedDates' | 'nextReview'>;
