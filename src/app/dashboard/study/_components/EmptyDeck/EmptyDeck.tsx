import NextImage from 'next/image';
import Link from 'next/link';
import { IconChevronLeft } from '@tabler/icons-react';
import { Button, Image, Stack, Text } from '@mantine/core';
import classroom from '@/assets/classroom.svg';

export const EmptyDeck = () => {
  return (
    <Stack>
      <Image
        component={NextImage}
        width={500}
        height={500}
        src={classroom}
        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        alt=" "
      />
      <Text
        pos="absolute"
        p={50}
        ta="center"
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: 'yellow', to: 'white', deg: 90 }}
      >
        Great job! You've reviewed every card in this deck!
      </Text>
      <Button component={Link} href="/dashboard" leftSection={<IconChevronLeft size={20} />}>
        Go Back
      </Button>
    </Stack>
  );
};
