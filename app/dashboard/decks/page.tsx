import { Group, Stack, ScrollArea } from '@mantine/core';
import { Deck } from '@/components/Deck/Deck';
import { fetchDecks } from '@/app/api/actions/decks';
import { DecksHeader } from '@/components/DecksHeader/DecksHeader';
import { DashboardHeaderShell } from '@/components/DashboardHeaderShell/DashboardHeaderShell';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const decks = await fetchDecks();
  const query = searchParams?.query || '';

  const decksToShow = query === '' ? decks : decks?.filter((deck: any) => deck.title === query);

  return (
    <Stack justify="flex-start" h="100vh">
      <DashboardHeaderShell>
        <DecksHeader />
      </DashboardHeaderShell>

      <ScrollArea w="100%">
        <Group grow>
          {decksToShow?.map((d: any) => <Deck title={d.title} id={d.id} tags={d.tags} />)}
        </Group>
      </ScrollArea>
    </Stack>
  );
}
