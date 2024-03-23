/* eslint-disable arrow-body-style */
import { Title, Text, Anchor } from '@mantine/core';
import classes from './Welcome.module.css';

const Welcome = () => {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Pexo
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        In development. Stay tuned...
      </Text>
    </>
  );
};

export default Welcome;
