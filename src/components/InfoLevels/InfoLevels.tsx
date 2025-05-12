import { Divider, Group, Stack, Text, Title } from '@mantine/core';
import { LevelStripe } from '../LevelStripe/LevelStripe';

export function InfoLevels() {
  return (
    <Stack p="lg">
      <Title ta="center" order={2}>
        Learning Progression
      </Title>
      <Text ta="center">
        Our algorithm uses spaced repetition to focus on words you need to practice more, adjusting
        your proficiency over time. Regular practice and accuracy will help you improve.
      </Text>
      <Divider />
      <Group wrap="nowrap">
        <LevelStripe level={5} />
        <Text>Maximum memory strength!</Text>
      </Group>
      <Group wrap="nowrap">
        <LevelStripe level={4} />
        <Text>On the tip of your tongue!</Text>
      </Group>
      <Group wrap="nowrap">
        <LevelStripe level={3} />
        <Text>On the way to learning this word.</Text>
      </Group>
      <Group wrap="nowrap">
        <LevelStripe level={2} />
        <Text>This word needs more practice.</Text>
      </Group>
      <Group wrap="nowrap">
        <LevelStripe level={1} />
        <Text>Weakest memory strength.</Text>
      </Group>
    </Stack>
  );
}
