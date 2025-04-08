import { Text, Stack, Button, ThemeIcon, Container, Box } from '@mantine/core';
import Link from 'next/link';
import { IconChevronLeft, IconMoodSmileBeam } from '@tabler/icons-react';
import { FlashCard } from '@/src/components/FlashCard/FlashCard';
import FlashCardToolbar from '@/src/components/FlashCardToolbar/FlashCardToolbar';
import { useCardsDue } from '@/src/app/hooks';
import { ProgressBar } from '@/src/components/ProgressBar/ProgressBar';
import classes from './page.module.css';
import { getDeckById } from '@/src/app/api/database/decks/queries';
import { DeckWithCards } from '@/src/prisma/types';

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

export default async function Page(props: { params: Promise<{ deckId: string }> }) {
  const params = await props.params;
  const deck: DeckWithCards = await getDeckById(params.deckId);
  const cardsToTest = useCardsDue(deck.cards ?? []);

  return (
    <Stack align="center">
      <Box w="80%">
        <ProgressBar cards={deck.cards} />
      </Box>
      {cardsToTest.length === 0 ? (
        <EmptyDeck id={params.deckId} />
      ) : (
        <Stack justify="space-around" h="100%" px="lg" className={classes.container}>
          <FlashCard
            id={cardsToTest[0].id}
            front={cardsToTest[0].front}
            back={cardsToTest[0].back}
            level={cardsToTest[0].level.toString()}
            reviewCount={cardsToTest[0].reviewedDates.length}
          />
          <FlashCardToolbar
            cardId={cardsToTest[0].id}
            currentLevel={cardsToTest[0].level}
            audioUrl={cardsToTest[0].audioUrl}
          />
        </Stack>
      )}
    </Stack>
  );
}
