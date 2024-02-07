'use client';

import { Group, Text, Container } from '@mantine/core';
import cx from 'clsx';
import { useState } from 'react';
import classes from './FlashCard.module.css';

export function FlashCard({ front, back }: any) {
  const [flipped, setFlipped] = useState(false);
  return (
    <Container className={classes.card}>
      <Text c="dimmed" fz="sm">
        Click to flip!
      </Text>
      <Group
        onClick={() => setFlipped(!flipped)}
        className={cx(classes['card-inner'], {
          [classes['card-flipped']]: flipped === true,
        })}
      >
        <Container className={classes['card-front']}>
          <Text>{front}</Text>
        </Container>
        <Container className={classes['card-back']}>
          <Text>{back}</Text>
        </Container>
      </Group>
    </Container>
  );
}
