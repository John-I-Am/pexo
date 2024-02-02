import { Group, Skeleton, Stack } from '@mantine/core';

export default function Loading() {
  return (
    <>
      <Stack justify="flex-start" h="100vh" w="100%">
        <Skeleton height={50} radius="lg" width="93%" />
        <Group>
          <Skeleton height={200} mt={6} width="30%" radius="lg" />
          <Skeleton height={200} mt={6} width="30%" radius="lg" />
          <Skeleton height={200} mt={6} width="30%" radius="lg" />
          <Skeleton height={200} mt={6} width="30%" radius="lg" />
          <Skeleton height={200} mt={6} width="30%" radius="lg" />
          <Skeleton height={200} mt={6} width="30%" radius="lg" />
          <Skeleton height={200} mt={6} width="30%" radius="lg" />
          <Skeleton height={200} mt={6} width="30%" radius="lg" />
          <Skeleton height={200} mt={6} width="30%" radius="lg" />
        </Group>
      </Stack>
    </>
  );
}
