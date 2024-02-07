import { Stack } from '@mantine/core';
import { DashboardHeaderShell } from '@/components/DashboardHeaderShell/DashboardHeaderShell';
import { FlashCard } from '@/app/dashboard/FlashCard/FlashCard';
import { fetchDeckById } from '@/app/api/actions/decks';

export default async function Page({ params }: { params: { deckId: string } }) {
  const deck: any = await fetchDeckById(params.deckId);
  const cardsToTest: any = deck.cards;
  return (
    <Stack justify="space-between" align="center" h="100vh" w="100%">
      <DashboardHeaderShell>
        <p />
      </DashboardHeaderShell>
      <FlashCard front={cardsToTest[0].front} back={cardsToTest[0].back} />
      <p> control goes here</p>
    </Stack>
  );
}
