'use client';

import { useContext } from 'react';
import { Deck } from '@prisma/client';
import { IconChevronRight, IconPhoto } from '@tabler/icons-react';
import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { ActiveDeckContext } from '@/app/contexts/ActiveDeckProvider';
import classes from './DeckSelector.module.css';

type DeckSelectorProps = {
  decks: Deck[];
};

const DeckSelector = ({ decks }: DeckSelectorProps) => {
  const { activeDeckId, setActiveDeckId }: any = useContext(ActiveDeckContext);
  const activeDeck = activeDeckId === null ? null : decks.find((deck) => deck.id === activeDeckId);

  return (
    <Paper>
      <Group justify="space-between" wrap="nowrap">
        <Button
          className={classes.selector}
          leftSection={<IconPhoto />}
          rightSection={<IconChevronRight />}
          size="lg"
          onClick={() =>
            modals.openContextModal({
              modal: 'selectorModal',
              title: 'Deck Selection',
              innerProps: { decks },
            })
          }
        >
          <Text>Change Deck</Text>
        </Button>

        <Text size={'sm'} fw={500}>
          {activeDeckId === null ? '(ALL)' : activeDeck?.title}
        </Text>

        <Stack>
          <Button
            className={classes.button}
            justify="space-between"
            leftSection={<span />}
            rightSection={<IconChevronRight />}
          >
            <Text>Start Learning</Text>
          </Button>
          <Button
            className={classes.button}
            justify="space-between"
            leftSection={<span />}
            rightSection={<IconChevronRight />}
          >
            <Text>Card Editor</Text>
          </Button>
        </Stack>
      </Group>
    </Paper>
  );
};

export default DeckSelector;
