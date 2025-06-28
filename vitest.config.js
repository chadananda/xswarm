import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/__tests__/**/*.test.js', '**/test/**/*.test.js'],
    exclude: ['node_modules', 'dist', 'build', '.astro'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'build/',
        '.astro/',
        '**/*.config.js',
        '**/*.config.mjs',
        '**/bin/**'
      ]
    }
  }
});