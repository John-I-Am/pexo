import { Group } from '@mantine/core';
import cx from 'clsx';
import classes from './LevelStripe.module.css';

export function LevelStripe({ level }: { level: number }) {
  return (
    <Group wrap="nowrap" gap={8}>
      {[1, 2, 3, 4, 5].map((num) => (
        <div
          key={num}
          className={cx(classes.level, {
            [classes[`level-${level}`]]: num <= level,
          })}
        />
      ))}
    </Group>
  );
}
