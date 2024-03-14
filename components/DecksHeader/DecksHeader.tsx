'use client';

import { Button, Group } from '@mantine/core';
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { createDeck } from '@/app/api/actions/decks';
import { Searchbar } from '../Searchbar/Searchbar';

export async function DecksHeader() {
  const handleCreate = () => {
    createDeck();
    notifications.show({
      title: 'Deck Created',
      message: 'Start studying!',
    });
  };

  return (
    <Group wrap="nowrap">
      <Button
        onClick={handleCreate}
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
