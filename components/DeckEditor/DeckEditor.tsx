'use client';

import { Group, Text, TextInput, Button, Stack, Badge, Modal } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { IconSquareRoundedPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import classes from './DeckEditor.module.css';
import { updateDeck } from '@/app/api/actions/decks';

export function DeckEditor({
  id,
  title,
  tags = [],
  cardsLength,
}: {
  id: string;
  title: string;
  tags: string[];
  cardsLength: string;
}) {
  const form = useForm({
    initialValues: {
      title,
    },

    validate: {
      title: hasLength({ min: 1, max: 12 }, 'Title must be 1-12 characters long'),
    },
  });

  const form2 = useForm({
    initialValues: {
      tag: '',
    },

    validate: (values) => ({
      tag: tags.includes(values.tag)
        ? 'Tag already added'
        : values.tag.length < 1 || values.tag.length > 12
          ? 'Tag must be 1-12 characters long'
          : null,
    }),
  });

  const [opened, { open, close }] = useDisclosure(false);

  const handleChange = (e: any) => {
    form.getInputProps('title').onChange(e);
    // Pretty sure this is not the correct way to call server actions on input change.
    // Currently, it ignores the last character; doesn't save to server.
    form.onSubmit((values) =>
      updateDeck(id, {
        title: values.title,
        tags: undefined,
      })
    )();
  };

  return (
    <Stack justify="space-around" gap="lg">
      <Modal
        opened={opened}
        onClose={() => {
          form2.reset();
          close();
        }}
        title="Add new tag"
      >
        <form
          onSubmit={form2.onSubmit((values: any) =>
            updateDeck(id, {
              title: undefined,
              tags: [...tags, values.tag],
            })
          )}
        >
          <TextInput {...form2.getInputProps('tag')} aria-label="tag" placeholder="tag" />
          <Button mt="lg" type="submit">
            Submit
          </Button>
        </form>
      </Modal>
      <Group wrap="nowrap" justify="space-around">
        <Button
          component={Link}
          href={`/dashboard/decks/${id}/card`}
          leftSection={<IconSquareRoundedPlus size={20} />}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        >
          New Card
        </Button>
        <form
          onSubmit={form.onSubmit((values) =>
            updateDeck(id, {
              title: values.title,
              tags: undefined,
            })
          )}
        >
          <TextInput
            {...form.getInputProps('title')}
            classNames={{
              input: classes.title,
            }}
            onChange={handleChange}
            variant="unstyled"
            aria-label="Title"
            size="md"
            radius="md"
            maxLength={12}
            placeholder="title"
          />
        </form>

        <Text c="dimmed">{cardsLength} cards</Text>
        <Button
          component={Link}
          href={`/dashboard/decks/${id}/learn`}
          leftSection={<IconSquareRoundedPlus size={20} />}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        >
          Learn
        </Button>
      </Group>
      <Group wrap="nowrap">
        <Button
          onClick={open}
          size="compact-sm"
          w="120px"
          leftSection={<IconSquareRoundedPlus size={18} />}
        >
          Add Tag
        </Button>
        <Group className={classes.tags} wrap="nowrap">
          {tags.map((tag: string) => (
            <Badge key={tag} variant="light" className={classes.tag}>
              {tag}
            </Badge>
          ))}
        </Group>
      </Group>
    </Stack>
  );
}
