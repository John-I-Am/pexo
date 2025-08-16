'use client';

import { Button, Group, Pill, Stack, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { ContextModalProps, modals } from '@mantine/modals';
import { updateDeck } from '@/app/api/database/decks/mutations';
import classes from './TagsManagerModal.module.css';

export const TagsManagerModal = ({
  id,
  innerProps,
}: ContextModalProps<{ deckId: string; tags: string[] }>) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      tag: '',
    },

    validate: {
      tag: (value) =>
        (innerProps.tags.includes(value) ? 'Tag already exists' : null) ||
        hasLength({ min: 1, max: 12 }, 'Tag must be 1-12 characters long')(value),
    },
  });

  const handleSubmitTag = async ({ tag }: { tag: string }) => {
    if (!innerProps.tags.includes(tag)) {
      await updateDeck(innerProps.deckId, {
        title: undefined,
        tags: [...innerProps.tags, tag],
      });

      modals.updateContextModal({
        modalId: id,
        innerProps: {
          tags: [...innerProps.tags, tag],
        },
      });
    }
    form.reset();
  };

  const handleDeleteTag = async (tag: string) => {
    await updateDeck(innerProps.deckId, {
      title: undefined,
      tags: innerProps.tags.filter((t) => t !== tag),
    });

    modals.updateContextModal({
      modalId: id,
      innerProps: {
        tags: innerProps.tags.filter((t) => t !== tag),
      },
    });
  };

  return (
    <Stack>
      <form onSubmit={form.onSubmit((values: any) => handleSubmitTag(values))}>
        <TextInput {...form.getInputProps('tag')} maxLength={12} minLength={1} />
        <Button type="submit" fullWidth my="lg">
          Add Tag
        </Button>
      </form>

      <Group wrap="wrap">
        {innerProps.tags.map((tag) => (
          <Pill
            key={tag}
            className={classes.tag}
            withRemoveButton
            onRemove={() => handleDeleteTag(tag)}
          >
            {tag}
          </Pill>
        ))}
      </Group>
    </Stack>
  );
};
