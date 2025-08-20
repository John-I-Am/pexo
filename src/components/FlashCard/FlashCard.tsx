'use client';

import { useEffect, useState } from 'react';
import cx from 'clsx';
import { Container, Group, Text } from '@mantine/core';
import { Levelbar } from '../Levelbar/Levelbar';
import classes from './FlashCard.module.css';

export function FlashCard({
  id,
  front,
  back,
  level,
  reviewCount,
}: {
  id: string;
  front: string;
  back: string;
  level: string;
  reviewCount: number;
}) {
  const [flipped, setFlipped] = useState(false);

  // This resets the "flipped" state for each card
  useEffect(() => {
    setFlipped(false);
  }, [id]);

  const renderHeader = (label: string) => (
    <Group justify="space-between" w="100%" p="md" wrap="nowrap" className={classes['card-header']}>
      <Levelbar level={+level} reviewCount={reviewCount} />
      <Text c="dimmed" fz="xs">
        {label}
      </Text>
    </Group>
  );

  return (
    <Container className={classes.card}>
      <Text c="dimmed" fz="xs" pb="sm" pl="md">
        Click to flip!
      </Text>
      <Group
        onClick={() => setFlipped(!flipped)}
        className={cx(classes['card-inner'], {
          [classes['card-flipped']]: flipped === true,
        })}
      >
        <Container className={classes['card-front']}>
          {renderHeader('front')}
          <Text>{front}</Text>
        </Container>
        <Container className={classes['card-back']}>
          {renderHeader('back')}
          <Text>{back}</Text>
        </Container>
      </Group>
    </Container>
  );
}
