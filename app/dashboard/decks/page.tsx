import { Group, Stack, ScrollArea } from '@mantine/core';
import { Deck } from '@/components/Deck/Deck';
import { fetchDecks } from '@/app/api/actions/decks';
import { DeckEditor } from '@/components/DeckEditor/DeckEditor';
import { DashboardHeader } from '@/components/DashboardHeader/DashboardHeader';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const decks = await fetchDecks();
  const query = searchParams?.query || '';

  const decksToShow = query === '' ? decks : decks?.filter((deck) => deck.title === query);

  return (
    <Stack justify="flex-start" h="100vh">
      <DashboardHeader>
        <DeckEditor />
      </DashboardHeader>

      <ScrollArea w="100%">
        <Group grow>{decksToShow?.map((d) => <Deck title={d.title} id={d.id} />)}</Group>
      </ScrollArea>
    </Stack>
  );
}
