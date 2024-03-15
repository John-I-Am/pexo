'use client';

import { Group, Text, Container } from '@mantine/core';
import cx from 'clsx';
import { useState } from 'react';
import classes from './FlashCard.module.css';

export function FlashCard({ front, back, level }: { front: string; back: string; level: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <Container className={classes.card}>
      <Group justify="space-around">
        <Text c="dimmed" fz="sm">
          Click to flip!
        </Text>
        <Text fz="sm">{`Level ${level}`}</Text>
      </Group>
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
