/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import dayjs from '@/lib/dayjs';
import { useState } from 'react';
import { Box, Slider, Stack, Text, Title } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { upsertSessionLog } from '@/app/api/database/sessions/mutations';

export function GoalSlider({
  context,
  innerProps: { initialGoal, userId },
}: ContextModalProps<{ initialGoal: number; userId: string }>) {
  const [value, setValue] = useState(initialGoal);

  const handleOnChangeEnd = async (e: any) => {
    await upsertSessionLog(userId, dayjs().startOf('day').toDate(), e);
  };

  return (
    <Stack gap="xl">
      <Title order={1} fz="lg">
        Daily goal
      </Title>
      <Stack align="center">
        <Text fz="xl" fw="bold" c="blue">
          {value} cards
        </Text>
        {value === 50 ? (
          <Text fz="sm" mt="-md">
            Recommended
          </Text>
        ) : (
          <Box py="3px" /> // this acts as placeholder to prevent layout shift
        )}
      </Stack>

      <Slider
        marks={[
          { value: 50, label: '50' },
          { value: 200, label: '200' },
        ]}
        min={0}
        max={200}
        label={null}
        color="blue"
        value={value}
        onChange={setValue}
        onChangeEnd={handleOnChangeEnd}
      />
      <Text pt="lg">
        For best results, try to learn every day. 50 cards would be ideal, but even 10 cards on
        tough days can help create a healthy learning habit.
      </Text>
    </Stack>
  );
}
