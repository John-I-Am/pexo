import { Deck } from '@prisma/client';
import { upsertCard } from '@/app/api/database/cards/mutations';
import { createDeck } from '@/app/api/database/decks/mutations';
import { NewCard } from '@/lib/prisma/types';

export const cloneDeck = async (title, description, tags, cards) => {
  const deck: Deck = await createDeck();

  const cardCreationPromises = cards.map((card: NewCard) =>
    upsertCard(deck.id, undefined, card.front, card.back, ' ', false)
  );
  await Promise.all(cardCreationPromises);
  return deck.id;
};
