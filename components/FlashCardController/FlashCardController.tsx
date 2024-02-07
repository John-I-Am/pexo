'use client';

import { Button, Group } from '@mantine/core';
import { updateCard } from '@/app/api/actions/cards';

export default function FlashCardController({ cardId, currentLevel }: any) {
  return (
    <Group>
      <Button onClick={() => updateCard(cardId, { level: currentLevel + 1 }, false)}>
        Correct
      </Button>
      <Button onClick={() => updateCard(cardId, { level: currentLevel - 1 }, false)}>
        Incorrect
      </Button>
    </Group>
  );
}
