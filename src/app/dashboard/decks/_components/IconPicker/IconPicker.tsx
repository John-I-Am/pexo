'use client';

import { Group, Text, ActionIcon } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import * as TablerIcons from '@tabler/icons-react';
import { TablerIconsProps } from '@tabler/icons-react';

const icons = Object.keys(TablerIcons)
  .filter((iconName) => iconName !== 'createReactComponent') // Filter out non-icon key
  .map((iconName) => {
    const IconComponent = TablerIcons[
      iconName as keyof typeof TablerIcons
    ] as React.FC<TablerIconsProps>;
    return (
      <ActionIcon
        key={iconName}
        variant="light"
        aria-label="Icon"
        onClick={() => console.log(iconName)}
      >
        <IconComponent key={iconName} />
      </ActionIcon>
    );
  });

export function IconPicker({ context, id, innerProps }: ContextModalProps<any>) {
  return (
    <>
      <Text>WORK IN PROGRESS</Text>
      <Group h="20rem">{icons}</Group>
    </>
  );
}
