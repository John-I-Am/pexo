'use client';

import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconChevronRight, IconPhoto } from '@tabler/icons-react';
import classes from './DeckSelector.module.css';
import { Deck } from '@prisma/client';
import { useContext } from 'react';
import { ActiveDeckContext } from '@/src/app/contexts/ActiveDeckProvider';

type DeckSelectorProp = {
  decks: Deck[];
};

const DeckSelector = ({ decks }: DeckSelectorProp) => {
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
              classNames: { title: classes['modal-title'], header: classes['modal-header'] },
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
