'use client';

import { IconPlus } from '@tabler/icons-react';
import { Accordion, rem, Stack, ThemeIcon, Title } from '@mantine/core';
import classes from './Faq.module.css';

const data = [
  {
    value: 'What is Pexo',
    description: 'Just another spaced repetition flashcard app.',
  },
  {
    value: 'What sort of flashcards does it support',
    description:
      'Currently, it supports classic front/back and cloze-type cards, with plans to add support for additional card types in the future.',
  },
  {
    value: 'Where can i leave feedback?',
    description: 'Click here ... not implemented yet =(',
  },
  {
    value: 'Where do I enter my password?',
    description:
      'We have a no password system! Just enter your email and a magic-link will be sent to your address to grant you access.',
  },
  {
    value: 'Is it ready for long-term learning?',
    description: 'No! Your data may be deleted unprompted. ',
  },
];

export const Faq = () => {
  const items: any = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Stack p="xl" id="faq">
      <Title order={2} ta="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion
        classNames={classes}
        chevronSize={26}
        variant="separated"
        chevron={
          <ThemeIcon radius="xl" size={26}>
            <IconPlus style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ThemeIcon>
        }
      >
        {items}
      </Accordion>
    </Stack>
  );
};
