import { Stack, Title } from '@mantine/core';
import { FormName } from '@/components/FormName/FormName';

export default function Page() {
  return (
    <Stack>
      <Title order={2}>My Account</Title>
      <FormName />
    </Stack>
  );
}
