import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'packages/shared/src'),
      '@ui': path.resolve(__dirname, 'packages/ui/src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // Environnement par défaut
    include: [
      'apps/**/*.{test,spec}.{js,ts,tsx}',
      'packages/**/*.{test,spec}.{js,ts,tsx}',
    ],
    exclude: ['node_modules', 'dist', 'build', 'target'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      all: true,
      include: ['apps/**/*.{js,ts,tsx}', 'packages/**/*.{js,ts,tsx}'],
      exclude: [
        '**/*.d.ts',
        '**/node_modules/**',
        'dist/**',
        'build/**',
        'target/**',
      ],
    },
    alias: {
      '@shared': path.resolve(__dirname, 'packages/shared/src'),
      '@ui': path.resolve(__dirname, 'packages/ui/src'),
    },
    setupFiles: './vitest.setup.ts',
    watch: false,
    reporters: 'default',
    passWithNoTests: true, // Essentiel pour éviter l'échec quand aucun test n'est trouvé
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['packages/ui/.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
