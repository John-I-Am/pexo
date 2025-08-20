import {
  IconChartBar,
  IconCookie,
  IconGauge,
  IconLock,
  IconMessage2,
  IconUser,
} from '@tabler/icons-react';
import { SimpleGrid, Text, ThemeIcon } from '@mantine/core';
import classes from './FeaturesGrid.module.css';

export const featuresData = [
  {
    icon: IconGauge,
    title: 'Customizable',
    description: 'Customize the system to suit your preferences.',
  },
  {
    icon: IconUser,
    title: 'Privacy focused',
    description: 'Retain full controll over your data.',
  },
  {
    icon: IconCookie,
    title: 'No third parties',
    description: 'No non-essential third-party trackers.',
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
    title: 'Accessible Support',
    description: 'Receive assistance directly from the developer!',
  },
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export const Feature = ({ icon: Icon, title, description }: FeatureProps) => {
  return (
    <div className={classes.feature}>
      <ThemeIcon variant="light" size={60} radius={40}>
        <Icon />
      </ThemeIcon>
      <Text fw="bold" mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
};

export const FeaturesGrid = () => {
  const features = featuresData.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <SimpleGrid cols={{ base: 2, md: 3 }} spacing="xl" verticalSpacing="xl">
      {features}
    </SimpleGrid>
  );
};
