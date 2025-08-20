import { IconPig } from '@tabler/icons-react';
import { Group, Text, Title } from '@mantine/core';

export function Logo() {
  return (
    <Group wrap="nowrap">
      <IconPig />
      <Title order={1}>
        <Text
          inherit
          fw={900}
          variant="gradient"
          gradient={{ from: 'violet', to: 'blue', deg: 90 }}
        >
          Pexo
        </Text>
      </Title>
    </Group>
  );
}
