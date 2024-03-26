import { ThemeIcon, Text, Title, Container, SimpleGrid, rem, Stack } from '@mantine/core';
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock,
  IconChartBar,
} from '@tabler/icons-react';
import classes from './FeaturesGrid.module.css';

export const featuresData = [
  {
    icon: IconGauge,
    title: 'Extreme performance',
    description: 'Lightweight AND Powerful. No nonsense UI for a focused study session.',
  },
  {
    icon: IconUser,
    title: 'Privacy focused',
    description: 'Retain full controll over your data',
  },
  {
    icon: IconCookie,
    title: 'No third parties',
    description: 'No non-essential third-party trackers. Your data, you own it.',
  },
  {
    icon: IconLock,
    title: 'Secure by default',
    description: 'Encrypted data!',
  },
  {
    icon: IconChartBar,
    title: 'Data-Driven',
    description: 'Track your progress.',
  },
  {
    icon: IconMessage2,
    title: 'Accessible Developer',
    description: 'Chat with the developer (Me!) directly about any issues. Expect fast response.',
  },
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="light" size={60} radius={40}>
        <Icon stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export function FeaturesGrid() {
  const features = featuresData.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <Stack align="center" justify="center" px="20%" className={classes.container}>
      <Title className={classes.title}>The What</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          So what are the features...?
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {features}
      </SimpleGrid>
    </Stack>
  );
}
