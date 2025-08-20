/* eslint-disable @typescript-eslint/no-unused-vars */
import { upsertCard } from '@/app/api/database/cards/mutations';
import { createDeck } from '@/app/api/database/decks/mutations';
import { Card, Deck } from '@/generated/prisma';
import { NewCard } from '@/lib/prisma/types';

export const cloneDeck = async (
  title: string,
  description: string,
  tags: string[],
  cards: Card[]
) => {
  const deck: Deck = await createDeck();

  const cardCreationPromises = cards.map((card: NewCard) =>
    upsertCard(deck.id, undefined, card.front, card.back, ' ', false)
  );
  await Promise.all(cardCreationPromises);
  return deck.id;
};
