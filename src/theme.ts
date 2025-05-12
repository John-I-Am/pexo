'use client';

import {
  Button,
  createTheme,
  defaultVariantColorsResolver,
  Group,
  Paper,
  parseThemeColor,
  rem,
  ScrollArea,
  Skeleton,
  Textarea,
  TextInput,
  Tooltip,
  VariantColorsResolver,
} from '@mantine/core';
import { notoSans } from './fonts/Noto_Sans/NotoSans';

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color,
    theme: input.theme,
  });

  if (parsedColor.isThemeColor && parsedColor.color === 'indigo') {
    return {
      ...defaultResolvedColors,
      color: 'var(--mantine-color-black)',
    };
  }

  return defaultResolvedColors;
};

export const theme = createTheme({
  other: {
    accentColor: 'indigo.4',
    accentColorLighter: 'indigo.3',
    accentColorLightest: 'indigo.1',
  },

  black: '#2c3143',

  primaryColor: 'dark',
  primaryShade: { light: 6, dark: 9 },

  variantColorResolver,

  fontFamily: notoSans.style.fontFamily,
  headings: {
    fontFamily: notoSans.style.fontFamily,
    fontWeight: '500',
    sizes: {
      h1: { fontSize: rem(22) },
      h2: { fontSize: rem(20) },
      h3: { fontSize: rem(18) },
    },
  },

  components: {
    Group: Group.extend({
      defaultProps: {
        wrap: 'nowrap',
      },
    }),
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
    ScrollArea: ScrollArea.extend({
      defaultProps: {
        offsetScrollbars: true,
        type: 'always',
        h: '100%',
      },
    }),
  },
});
