import { Deck } from '@prisma/client';
import { ScrollArea, Stack } from '@mantine/core';
import { getDecks } from '@/app/api/database/decks/queries';
import { DeckList } from '@/components/DeckList/DeckList';

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
