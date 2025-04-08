import { Stack } from '@mantine/core';
import { CardTable } from '@/src/components/CardTable/CardTable';
import { DeckEditor } from '@/src/components/DeckEditor/DeckEditor';
import { getDeckById } from '@/src/app/api/database/decks/queries';
import { DeckWithCards } from '@/src/prisma/types';

type existingDeckPageProps = {
  params: Promise<{
    deckId: string;
  }>;
};

export default async function Page({ params }: existingDeckPageProps) {
  const { deckId } = await params;
  const deck: DeckWithCards = await getDeckById(deckId);
  return (
    <Stack gap="xs">
      <DeckEditor
        id={deck.id}
        title={deck.title}
        tags={deck.tags}
        cardsLength={deck.cards.length as any}
      />
      <CardTable cards={deck.cards} editable />
    </Stack>
  );
}
