import { Group, Title, Text } from '@mantine/core';
import { IconPig } from '@tabler/icons-react';

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
