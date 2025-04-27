'use client';

import { ActionIcon, Group } from '@mantine/core';
import { IconCheck, IconSpeakerphone, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './FlashCardToolbar.module.css';
import { updateCardLevel } from '@/app/api/database/cards/mutations';

export default function FlashCardController({
  cardId,
  currentLevel,
  audioUrl,
}: {
  cardId: string;
  currentLevel: number;
  audioUrl: string;
}) {
  const [isPendingCorrect, setIsPendingCorrect] = useState(false);
  const [isPendingIncorrect, setIsPendingIncorrect] = useState(false);

  const handleCorrect = async () => {
    setIsPendingCorrect(true);
    const response = await updateCardLevel(cardId, currentLevel, true);

    if (response) {
      setIsPendingCorrect(false);
    }
  };

  const handleIncorrect = async () => {
    setIsPendingIncorrect(true);
    const response = await updateCardLevel(cardId, currentLevel, false);

    if (response) {
      setIsPendingIncorrect(false);
    }
  };

  const playAudio = () => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <Group py="xs" justify="space-evenly" className={classes.container}>
      <Group>
        <ActionIcon
          disabled={isPendingIncorrect}
          loading={isPendingCorrect}
          variant="filled"
          aria-label="guess-correct"
          onClick={handleCorrect}
        >
          <IconCheck stroke={1.5} />
        </ActionIcon>

        <ActionIcon
          disabled={isPendingCorrect}
          loading={isPendingIncorrect}
          variant="filled"
          color="red"
          aria-label="guess-incorrect"
          onClick={handleIncorrect}
        >
          <IconX stroke={1.5} />
        </ActionIcon>
      </Group>

      <Group>
        {audioUrl && (
          <ActionIcon variant="subtle" aria-label="audio" onClick={playAudio}>
            <IconSpeakerphone stroke={1.5} />
          </ActionIcon>
        )}
      </Group>
    </Group>
  );
}
