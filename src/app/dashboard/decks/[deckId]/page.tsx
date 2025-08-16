import { Stack } from '@mantine/core';
import { getDeckById } from '@/app/api/database/decks/queries';
import { CardTable } from '@/components/CardTable/CardTable';
import { DeckWithCards } from '@/lib/prisma/types';
import { DeckEditor } from './_components/DeckEditor/DeckEditor';

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
        description={deck.description}
        cardsLength={deck.cards.length as any}
      />
      <CardTable cards={deck.cards} editable />
    </Stack>
  );
}
