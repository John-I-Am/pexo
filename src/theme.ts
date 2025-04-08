'use client';

import {
  Button,
  DEFAULT_THEME,
  Paper,
  Skeleton,
  TextInput,
  Textarea,
  Tooltip,
  createTheme,
  rem,
} from '@mantine/core';
import { notoSans } from './fonts/Noto_Sans/NotoSans';

export const theme = createTheme({
  /* Put your mantine theme override here */
  fontFamily: notoSans.style.fontFamily,
  headings: {
    fontFamily: `${notoSans.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
    fontWeight: '400',
    sizes: {
      h1: { fontSize: rem(24) },
      h2: { fontSize: rem(20) },
      h3: { fontSize: rem(18) },
    },
  },

  components: {
    Button: Button.extend({
      defaultProps: {
        radius: 'md',
        loaderProps: { type: 'dots' },
      },
    }),
    Paper: Paper.extend({
      defaultProps: {
        radius: 'md',
        p: 'md',
      },
    }),
    Tooltip: Tooltip.extend({
      defaultProps: {
        openDelay: 1000,
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        radius: 'md',
      },
      styles: { error: { position: 'absolute' } },
    }),
    Textarea: Textarea.extend({
      defaultProps: {
        radius: 'md',
      },
      styles: { error: { position: 'absolute' } },
    }),
    Skeleton: Skeleton.extend({
      defaultProps: {
        radius: 'md',
      },
    }),
  },
});
