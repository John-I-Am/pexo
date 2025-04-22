'use client';

import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { IconChevronRight, IconPhoto } from '@tabler/icons-react';
import classes from './DeckSelector.module.css';

const DeckSelector = () => {
  return (
    <Paper>
      <Group justify="space-between">
        <Button
          className={classes.selector}
          leftSection={<IconPhoto />}
          rightSection={<IconChevronRight />}
          size="lg"
        >
          <Text>Change Deck</Text>
        </Button>

        <Stack>
          <Button
            className={classes.button}
            justify="space-between"
            leftSection={<span />}
            rightSection={<IconChevronRight />}
          >
            <Text>Start Learning</Text>
          </Button>
          <Button
            className={classes.button}
            justify="space-between"
            leftSection={<span />}
            rightSection={<IconChevronRight />}
          >
            <Text>Card Editor</Text>
          </Button>
        </Stack>
      </Group>
    </Paper>
  );
};

export default DeckSelector;
