import { Stack } from '@mantine/core';
import { DashboardHeaderShell } from '@/components/DashboardHeaderShell/DashboardHeaderShell';
import { FlashCard } from '@/components/FlashCard/FlashCard';
import { fetchDeckById } from '@/app/api/actions/decks';
import FlashCardController from '@/components/FlashCardController/FlashCardController';

export default async function Page({ params }: { params: { deckId: string } }) {
  const deck: any = await fetchDeckById(params.deckId);
  const cardsToTest: any = deck.cards;
  return (
    <Stack justify="space-between" align="center" h="100vh" w="100%">
      <DashboardHeaderShell>
        <p />
      </DashboardHeaderShell>
      {cardsToTest.length === 0 ? (
        <p>empty</p>
      ) : (
        <>
          {' '}
          <FlashCard front={cardsToTest[0].front} back={cardsToTest[0].back} />
          <FlashCardController cardId={cardsToTest[0].id} currentLevel={cardsToTest[0].level} />
        </>
      )}
    </Stack>
  );
}
