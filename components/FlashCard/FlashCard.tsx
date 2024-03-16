'use client';

import { Group, Text, Container } from '@mantine/core';
import cx from 'clsx';
import { useEffect, useState } from 'react';
import classes from './FlashCard.module.css';

export function FlashCard({
  id,
  front,
  back,
  level,
}: {
  id: string;
  front: string;
  back: string;
  level: string;
}) {
  const [flipped, setFlipped] = useState(false);

  // This resets the "flipped" state for each card
  useEffect(() => {
    setFlipped(false);
  }, [id]);

  return (
    <Container className={classes.card}>
      <Group justify="space-around" mb="xs">
        <Text c="dimmed" fz="sm">
          Classic
        </Text>
        <Text fz="sm" fw="700">{`Level ${level}`}</Text>
      </Group>
      <Group
        onClick={() => setFlipped(!flipped)}
        className={cx(classes['card-inner'], {
          [classes['card-flipped']]: flipped === true,
        })}
      >
        <Container className={classes['card-front']}>
          <Group justify="space-around" w="100%" className={classes['card-header']}>
            <Text c="dimmed" fz="sm">
              Click to flip!
            </Text>
            <Text c="dimmed" fz="sm">
              Front
            </Text>
          </Group>
          <Text>{front}</Text>
        </Container>
        <Container className={classes['card-back']}>
          <Group justify="space-around" w="100%" className={classes['card-header']}>
            <Text c="dimmed" fz="sm">
              Click to flip!
            </Text>
            <Text c="dimmed" fz="sm">
              Back
            </Text>
          </Group>
          <Text>{back}</Text>
        </Container>
      </Group>
    </Container>
  );
}
