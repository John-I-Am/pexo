import { Card, Prisma } from '@prisma/client';

export type DeckWithCards = Prisma.DeckGetPayload<{
  include: { cards: true };
}>;

export type NewCard = Omit<Card, 'id' | 'deckId' | 'reviewedDates' | 'nextReview'>;
