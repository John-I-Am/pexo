import { Prisma } from '@prisma/client';

export type DeckWithCards = Prisma.DeckGetPayload<{
  include: { cards: true };
}>;
