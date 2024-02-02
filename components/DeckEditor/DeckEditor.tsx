'use client';

import { Button, Group } from '@mantine/core';
import { createDeck } from '@/app/api/actions/decks';
import { Searchbar } from '../Searchbar/Searchbar';

export async function DeckEditor() {
  return (
    <Group wrap="nowrap">
      <Button onClick={() => createDeck()}> NEW </Button>;
      <Searchbar />
    </Group>
  );
}
