import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';

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

    environmentMatchGlobs: [
      ['apps/web/**', 'jsdom'],
      ['apps/desktop/**', 'jsdom'],
      ['apps/mobile/**', 'jsdom'],
      ['apps/server/**', 'node'],
      ['apps/discord/**', 'node'],
    ],
  },
});
