'use client';

import { Button, Group } from '@mantine/core';
import { createCard } from '@/app/api/actions/cards';

export function CardEditor({ id }: any) {
  return (
    <Group>
      <Button onClick={() => createCard(id)}>ADD</Button>
    </Group>
  );
}
