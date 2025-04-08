import { Stack, ScrollArea } from '@mantine/core';
import { Deck } from '@prisma/client';
import { DeckList } from '@/src/components/DeckList/DeckList';
import { getDecks } from '@/src/app/api/database/decks/queries';

export default async function Page() {
  const decks: Deck[] = await getDecks();

  return (
    <Stack justify="flex-start">
      <ScrollArea>
        <DeckList decks={decks} editable />
      </ScrollArea>
    </Stack>
  );
}
