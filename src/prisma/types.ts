import { Prisma } from '@prisma/client';

const deckWithCards = Prisma.validator<Prisma.DeckDefaultArgs>()({
  include: { cards: true },
});

export type DeckWithCards = Prisma.DeckGetPayload<typeof deckWithCards>;
