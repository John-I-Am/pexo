import { Stack, Title } from '@mantine/core';
import { Setting } from './_components/setting/Setting';

const Page = () => {
  return (
    <Stack h="100%">
      <Title order={2}>My Account</Title>
      <Setting />
      <Setting />
    </Stack>
  );
};

export default Page;
