'use client';

import { Stack } from '@mantine/core';
import { CardForm } from './[cardId]/_components/CardForm';
import React from 'react';

export default function Page({ params }: any) {
  const { deckId }: any = React.use(params);
  return (
    <Stack>
      <CardForm deckId={deckId} />
    </Stack>
  );
}
