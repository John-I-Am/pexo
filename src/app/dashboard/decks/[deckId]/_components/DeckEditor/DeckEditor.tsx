'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { IconHourglassEmpty, IconPlus } from '@tabler/icons-react';
import { Button, Group, Loader, Modal, Pill, Stack, Text, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { updateDeck } from '@/app/api/database/decks/mutations';
import { ActiveDeckContext } from '@/app/contexts/ActiveDeckProvider';
import classes from './DeckEditor.module.css';

export const DeckEditor = ({
  id,
  title,
  tags = [],
  cardsLength,
}: {
  id: string;
  title: string;
  tags: string[];
  cardsLength: string;
}) => {
  const [pending, setPending] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);

  const { setActiveDeckIds }: any = useContext(ActiveDeckContext);

  const formTitle = useForm({
    initialValues: {
      title,
    },
  });

  const formTag = useForm({
    initialValues: {
      tag: '',
    },

    validate: {
      tag: hasLength({ min: 1, max: 12 }, 'Tag must be 1-12 characters long'),
    },
  });

  const handleChangeTitle = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    formTitle.onSubmit(() => {
      setPending(true);
      updateDeck(id, {
        title: value === '' ? 'untitled' : value,
        tags: undefined,
      }).then(() => {
        setPending(false);
      });
    })();
    formTitle.getInputProps('title').onChange(value);
  };

  const handleSubmitTag = ({ tag }: { tag: string }) => {
    if (!tags.includes(tag)) {
      updateDeck(id, {
        title: undefined,
        tags: [...tags, tag],
      });
    }
    formTag.reset();
    close();
  };

  return (
    <Stack>
      <Modal opened={opened} onClose={close} withCloseButton={false} padding="0">
        <form onSubmit={formTag.onSubmit((values: any) => handleSubmitTag(values))}>
          <TextInput {...formTag.getInputProps('tag')} maxLength={12} minLength={1} />
          <Button type="submit" fullWidth mt="md">
            Add Tag
          </Button>
        </form>
      </Modal>

      <Group>
        <Stack gap={0} w="33%">
          <form
            className={classes['form-title']}
            onSubmit={formTitle.onSubmit((values) =>
              updateDeck(id, {
                title: values.title,
                tags: undefined,
              })
            )}
          >
            <TextInput
              {...formTitle.getInputProps('title')}
              classNames={{
                input: classes.title,
              }}
              onChange={handleChangeTitle}
              variant="unstyled"
              aria-label="Title"
              size="sm"
              maxLength={12}
              minLength={1}
              placeholder="untitled"
            />
          </form>

          <Text fz="sm">{cardsLength} Total cards</Text>
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
        </Stack>

        <Text fz="sm" w="66%">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde provident eos fugiat id
          necessitatibus magni ducimus molestias. Placeat, consequatur. Quisquam, quae magnam
          perspiciatis excepturi iste sint itaque sunt laborum. Nihil?
        </Text>
      </Group>

      <Group pb="md" className={classes.tags}>
        {tags.map((t) => (
          <Pill
            key={t}
            className={classes.tag}
            withRemoveButton
            onRemove={() =>
              updateDeck(id, {
                title: undefined,
                tags: tags.filter((tag) => tag !== t),
              })
            }
          >
            {t}
          </Pill>
        ))}
      </Group>

      <Group w="100%">
        <Group>
          <Button radius="md" leftSection={<IconPlus size="1.1rem" />} onClick={open}>
            Add Tag
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
      </Group>
    </Stack>
  );
};
