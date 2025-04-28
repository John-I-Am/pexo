import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import vitest from '@vitest/eslint-plugin';
import mantine from 'eslint-config-mantine';
import testingLibrary from 'eslint-plugin-testing-library';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['**/*.{mjs,cjs,js,d.ts,d.mts}', '**/.next/**']),
  ...compat.extends(),
  tseslint.config(...mantine),
  {
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  {
    files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    ...testingLibrary.configs['flat/react'],
  },
  {
    files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/max-nested-describe': ['error', { max: 3 }],
    },
  },
]);
