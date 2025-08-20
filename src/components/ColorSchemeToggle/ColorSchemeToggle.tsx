'use client';

import { useState } from 'react';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { Switch, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const [isDark, setIsDark] = useState<boolean>(computedColorScheme === 'dark');

  const handleOnChange = () => {
    setIsDark(!isDark);
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Switch
      aria-label={`Toggle ${isDark ? 'light' : 'dark'} mode`}
      size="md"
      color="dark.4"
      onLabel={<IconSun size={20} color="var(--mantine-color-yellow-4)" />}
      offLabel={<IconMoonStars size={20} color="var(--mantine-color-blue-8)" />}
      checked={isDark}
      onChange={() => handleOnChange()}
    />
  );
}
