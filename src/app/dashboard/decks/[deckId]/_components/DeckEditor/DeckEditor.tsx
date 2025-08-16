'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { IconHourglassEmpty, IconPlus, IconTags } from '@tabler/icons-react';
import { Button, Group, Loader, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { updateDeck } from '@/app/api/database/decks/mutations';
import { ActiveDeckContext } from '@/app/contexts/ActiveDeckProvider';
import classes from './DeckEditor.module.css';

type DeckEditorProps = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  cardsLength: string;
};

export const DeckEditor = ({ id, title, tags = [], cardsLength, description }: DeckEditorProps) => {
  const [pending, setPending] = useState<boolean>(false);

  const { setActiveDeckIds }: any = useContext(ActiveDeckContext);

  const form = useForm({
    initialValues: {
      title,
      description,
    },
  });

  const handleOnSubmit = (field: 'title' | 'description', value: string) => {
    form.setFieldValue(field, value);

    const { title, description } = form.getValues();

    form.onSubmit(async () => {
      setPending(true);
      await updateDeck(id, {
        title,
        description,
      }).then(() => {
        setPending(false);
      });
    })();
  };

  return (
    <Stack>
      <form onSubmit={(event) => event.preventDefault()} className={classes.form}>
        <Group justify="space-between" w="100%">
          <Stack>
            <TextInput
              {...form.getInputProps('title')}
              classNames={{
                input: classes.title,
              }}
              onChange={({ target }) => handleOnSubmit('title', target.value)}
              variant="unstyled"
              aria-label="Title"
              size="sm"
              maxLength={12}
              minLength={1}
              placeholder="untitled"
            />
            <Text fz="sm">{cardsLength} Total cards</Text>
          </Stack>

          <Textarea
            {...form.getInputProps('description')}
            onChange={({ target }) => handleOnSubmit('description', target.value)}
            variant="unstyled"
            aria-label="Description"
            size="sm"
            maxLength={255}
            placeholder="About..."
            w="100%"
            rows={5}
          />
        </Group>
      </form>

      <Stack gap="0" h={20}>
        {pending && (
          <>
            <Text fz="xs" c="dimmed">
              Saving data...
            </Text>
            <Loader size="xs" />
          </>
        )}
      </Stack>

      <Group>
        <Button
          radius="md"
          leftSection={<IconTags size="1.1rem" />}
          onClick={() =>
            modals.openContextModal({
              modal: 'tagsManager',
              title: 'Tags',
              innerProps: {
                deckId: id,
                tags,
              },
            })
          }
        >
          Manage Tags
        </Button>
        <Button
          onClick={() => setActiveDeckIds([id])}
          component={Link}
          href="/dashboard/study"
          radius="md"
          leftSection={<IconHourglassEmpty size="1.1rem" />}
        >
          Learn
        </Button>

        <Button
          component={Link}
          href={`/dashboard/decks/${id}/card`}
          radius="md"
          leftSection={<IconPlus size="1.1rem" />}
        >
          New Card
        </Button>
      </Group>
    </Stack>
  );
};
