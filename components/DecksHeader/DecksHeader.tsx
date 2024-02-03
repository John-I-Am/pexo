'use client';

import { Button, Group } from '@mantine/core';
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import { createDeck } from '@/app/api/actions/decks';
import { Searchbar } from '../Searchbar/Searchbar';

export async function DecksHeader() {
  return (
    <Group wrap="nowrap">
      <Button
        onClick={() => createDeck()}
        leftSection={<IconSquareRoundedPlus size={20} />}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      >
        Create New Deck
      </Button>

      <Searchbar />
    </Group>
  );
}
