import { Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { InfoLevels } from '../InfoLevels/InfoLevels';
import classes from './Levelbar.module.css';
import { LevelStripe } from '../LevelStripe/LevelStripe';

export function Levelbar({ level, reviewCount }: { level: number; reviewCount: number }) {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    modals.open({ children: <InfoLevels /> });
  };

  return (
    <Group wrap="nowrap" className={classes.wrapper} onClick={handleClick}>
      <LevelStripe level={level} />
      {reviewCount === 0 && (
        <Text px="xs" fz="xs" c="blue">
          New word
        </Text>
      )}
      <Text px="xs" c="dimmed" fz="xs">
        View Details
      </Text>
    </Group>
  );
}
