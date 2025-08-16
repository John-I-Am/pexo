import { Card, Deck, Prisma } from '@/generated/prisma';

export type DeckWithCards = Prisma.DeckGetPayload<{
  include: { cards: true };
}>;

export type NewCard = Omit<Card, 'id' | 'deckId' | 'reviewedDates' | 'nextReview'>;

export type DeckUpdate = Partial<Omit<Deck, 'id' | 'authorId'>>;

export type CardUpdate = Partial<Omit<Card, 'id' | 'deckId'>>;
