'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/dist/client/components/navigation';
import { Deck } from '@prisma/client';
import {
  IconCircleCheckFilled,
  IconIconsFilled,
  IconPigFilled,
  IconSearch,
} from '@tabler/icons-react';
import { Button, Group, rem, Text, TextInput, Title } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { createDeck } from '@/app/api/database/decks/mutations';
import { ActiveDeckContext } from '@/app/contexts/ActiveDeckProvider';
import classes from './SelectorModal.module.css';

export const SelectorModal = ({
  context,
  innerProps: { decks },
}: ContextModalProps<{ decks: Deck[] }>) => {
  const { activeDeckId, setActiveDeckId }: any = useContext(ActiveDeckContext);
  const [decksToShow, setDecksToShow] = useState<Deck[]>(decks);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleOnChange = (value: string) => {
    setSearchTerm(value);
    setDecksToShow(decks.filter((deck: Deck) => deck.title.includes(value)));
  };

  const router = useRouter();
  const handleOnCreate = async () => {
    const newDeck = await createDeck();
    router.push(`/dashboard/decks/${newDeck.id}`);
    context.closeAll();
  };

  const deckButton = decksToShow.map((deck: Deck) => {
    return (
      <Group key={deck.id} pl={0}>
        <Button
          size="xl"
          onClick={() => setActiveDeckId(deck.id)}
          justify="space-between"
          fullWidth
          variant="subtle"
          leftSection={<IconIconsFilled />}
          rightSection={activeDeckId === deck.id ? <IconCircleCheckFilled /> : <span />}
        >
          <Text className={classes['deck-title']}>{deck.title}</Text>
        </Button>
      </Group>
    );
  });

  return (
    <>
      <Group justify="space-between" wrap="nowrap" pb="md">
        <TextInput
          size="xs"
          placeholder="Search"
          leftSectionPointerEvents="none"
          leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} />}
          value={searchTerm}
          onChange={(event) => handleOnChange(event.currentTarget.value)}
        />
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
        rightSection={activeDeckId === null ? <IconCircleCheckFilled /> : <span />}
      >
        <Text
          size="xl"
          fw={900}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        >
          ALL
        </Text>
      </Button>
      {deckButton}
    </>
  );
};
