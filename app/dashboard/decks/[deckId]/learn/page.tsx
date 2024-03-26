import { Text, Stack, Button, ThemeIcon, Container, Progress } from '@mantine/core';
import Link from 'next/link';
import { IconChevronLeft, IconMoodSmileBeam } from '@tabler/icons-react';
import { DashboardHeaderShell } from '@/components/DashboardHeaderShell/DashboardHeaderShell';
import { FlashCard } from '@/components/FlashCard/FlashCard';
import { fetchDeckById } from '@/app/api/actions/decks';
import FlashCardController from '@/components/FlashCardController/FlashCardController';

function EmptyDeck({ id }: { id: string }) {
  return (
    <Stack mb="30%">
      <Container>
        <ThemeIcon variant="outline" radius="xl" size="xxl">
          <IconMoodSmileBeam size={150} />
        </ThemeIcon>
      </Container>
      <Text
        ta="center"
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      >
        Well done! you've reviewed all cards for this session.
      </Text>
      <Button
        component={Link}
        href={`/dashboard/decks/${id}`}
        leftSection={<IconChevronLeft size={20} />}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      >
        Go Back
      </Button>
    </Stack>
  );
}

export default async function Page({ params }: { params: { deckId: string } }) {
  const deck: any = await fetchDeckById(params.deckId);
  const cardsToTest: any[] = deck.cards.filter(
    (card: any) => new Date(card.nextReview).getTime() <= new Date().getTime()
  );

  return (
    <Stack py="lg" justify="space-between" align="center" h="100vh" w="100%">
      <DashboardHeaderShell>
        <Progress value={((deck.cards.length - cardsToTest.length) / deck.cards.length) * 100} />
        <Text fs="sm" c="dimmed">
          {`${deck.cards.length - cardsToTest.length} / ${deck.cards.length}`}
        </Text>
      </DashboardHeaderShell>
      {cardsToTest.length === 0 ? (
        <EmptyDeck id={params.deckId} />
      ) : (
        <>
          <FlashCard
            id={cardsToTest[0].id}
            front={cardsToTest[0].front}
            back={cardsToTest[0].back}
            level={cardsToTest[0].level}
          />
          <FlashCardController cardId={cardsToTest[0].id} currentLevel={cardsToTest[0].level} />
        </>
      )}
    </Stack>
  );
}
