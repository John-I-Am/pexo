import { Skeleton, Stack } from '@mantine/core';

export default function Loading() {
  return (
    <>
      <Stack justify="space-between" h="100vh" w="100%" p="md">
        <Skeleton height={300} />
      </Stack>
    </>
  );
}
