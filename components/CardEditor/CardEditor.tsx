'use client';

import { Button, Stack, Textarea } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { createCard } from '@/app/api/actions/cards';

export function CardEditor({ deckId }: any) {
  const form = useForm({
    initialValues: {
      front: '',
      back: '',
    },

    validate: {
      front: hasLength({ min: 1, max: 150 }, 'Front must be 1-150 characters long'),
      back: hasLength({ min: 1, max: 150 }, 'Back must be 1-150 characters long'),
    },
  });
  return (
    <Stack>
      <form onSubmit={form.onSubmit((values) => createCard(deckId, values.front, values.back))}>
        <Textarea
          pb="md"
          radius="md"
          label="Front"
          description="Front side of card"
          placeholder="Front"
          {...form.getInputProps('front')}
        />

        <Textarea
          pb="md"
          radius="md"
          label="Back"
          description="Back side of card"
          placeholder="Back"
          {...form.getInputProps('back')}
        />
        <Button type="submit">Create</Button>
      </form>
    </Stack>
  );
}
