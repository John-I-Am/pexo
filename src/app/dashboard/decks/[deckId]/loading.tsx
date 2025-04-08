import { Skeleton, Stack } from '@mantine/core';

export default function Loading() {
  return (
    <>
      <Stack justify="flex-start" h="100vh" w="100%" p={'md'}>
        <Skeleton height="25%" />
        <Skeleton height="100%" />
      </Stack>
    </>
  );
}
