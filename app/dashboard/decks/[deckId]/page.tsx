import { Stack } from '@mantine/core';
import { DashboardHeaderShell } from '@/components/DashboardHeaderShell/DashboardHeaderShell';
import { fetchDeckById } from '@/app/api/actions/decks';
import { CardTable } from '@/components/CardTable/CardTable';
import { DeckEditor } from '@/components/DeckEditor/DeckEditor';

export default async function Page({ params }: { params: { deckId: string } }) {
  const deck: any = await fetchDeckById(params.deckId);
  return (
    <Stack justify="flex-start" h="100vh" style={{ overflow: 'scroll' }}>
      <DashboardHeaderShell>
        <DeckEditor
          id={deck.id}
          title={deck.title}
          tags={deck.tags}
          cardsLength={deck.cards.length}
        />
      </DashboardHeaderShell>
      <CardTable cards={deck.cards} />
    </Stack>
  );
}
