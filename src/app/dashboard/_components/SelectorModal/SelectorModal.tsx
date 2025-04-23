'use client';

import { Button, Group, Title } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';

import { Searchbar } from '@/src/components/Searchbar/Searchbar';
import { Deck } from '@prisma/client';
import { IconCircleCheck, IconIconsFilled, IconPigFilled } from '@tabler/icons-react';
import { createDeck } from '@/src/app/api/database/decks/mutations';
import { useRouter } from 'next/dist/client/components/navigation';
import { ActiveDeckContext } from '@/src/app/contexts/ActiveDeckProvider';
import { useContext } from 'react';

export const SelectorModal = ({
  context,
  innerProps: { decks },
}: ContextModalProps<{ decks: Deck[] }>) => {
  const { activeDeckId, setActiveDeckId }: any = useContext(ActiveDeckContext);

  const router = useRouter();
  const handleOnCreate = async () => {
    const newDeck = await createDeck();
    router.push(`/dashboard/decks/${newDeck.id}`);
    context.closeAll();
  };

  const deckData = decks.map((deck: Deck) => {
    return (
      <Group key={deck.id} p={'md'} pl={0}>
        <Button
          size="md"
          onClick={() => setActiveDeckId(deck.id)}
          justify="space-between"
          fullWidth
          variant="subtle"
          leftSection={<IconIconsFilled />}
          rightSection={activeDeckId === deck.id ? <IconCircleCheck /> : <span></span>}
        >
          <Title order={3}>{deck.title}</Title>
        </Button>
      </Group>
    );
  });

  return (
    <>
      <Group p={'md'} pl={0}>
        <Searchbar />
        <Button onClick={handleOnCreate}>Create new</Button>
      </Group>
      <Title order={3}>Decks</Title>
      <Button
        size="md"
        onClick={() => setActiveDeckId(null)}
        justify="space-between"
        fullWidth
        variant="subtle"
        leftSection={<IconPigFilled />}
        rightSection={activeDeckId === null ? <IconCircleCheck /> : <span></span>}
      >
        <Title order={3}>{'ALL'}</Title>
      </Button>
      {deckData}
    </>
  );
};
