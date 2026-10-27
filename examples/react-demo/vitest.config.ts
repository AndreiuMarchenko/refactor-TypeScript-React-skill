import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

const component = process.env.DEMO_STAGE === 'before'
  ? './fixtures/before/notifications/Notifications.tsx'
  : './src/notifications/Notifications.tsx';

export default defineConfig({
  resolve: { alias: { '@notifications': fileURLToPath(new URL(component, import.meta.url)) } },
  test: { environment: 'jsdom', include: ['tests/**/*.test.tsx'] },
});
