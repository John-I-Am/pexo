'use client';

import { Button, Stack, Textarea } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { createCard, updateCard } from '@/app/api/actions/cards';

export function CardEditor({ deckId, card }: any) {
  const form = useForm({
    initialValues: {
      front: card?.front || '',
      back: card?.back || '',
    },

    validate: {
      front: hasLength({ min: 1, max: 150 }, 'Front must be 1-150 characters long'),
      back: hasLength({ min: 1, max: 150 }, 'Back must be 1-150 characters long'),
    },
  });

  return (
    <Stack>
      <form
        onSubmit={form.onSubmit((values) =>
          card ? updateCard(card.id, values, true) : createCard(deckId, values.front, values.back)
        )}
      >
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
        <Button type="submit">{card ? 'Edit' : 'Create'}</Button>
      </form>
    </Stack>
  );
}
