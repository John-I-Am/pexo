import { Stack } from '@mantine/core';
import { DashboardHeaderShell } from '@/components/DashboardHeaderShell/DashboardHeaderShell';
import { fetchDeckById } from '@/app/api/actions/decks';
import { CardEditor } from '@/components/CardEditor/CardEditor';
import { CardTable } from '@/components/CardTable/CardTable';

export default async function Page({ params }: { params: { id: string } }) {
  const deck: any = await fetchDeckById(params.id);
  return (
    <Stack justify="flex-start" h="100vh">
      <DashboardHeaderShell>
        <h1>{deck?.title}</h1>
        {/* <CardEditor id={deck.id} /> */}
        <h1>{deck?.cards.length}</h1>
      </DashboardHeaderShell>
      {/* <CardTable cards={deck.cards} /> */}
    </Stack>
  );
}
