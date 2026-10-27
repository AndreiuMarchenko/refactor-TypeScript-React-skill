import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const fixtureRoot = fileURLToPath(new URL('./fixtures/', import.meta.url));

export default defineConfig({
  plugins: [{
    name: 'exclude-historical-fixtures',
    generateBundle() {
      const historicalModules = [...this.getModuleIds()].filter((id) => id.startsWith(fixtureRoot));
      if (historicalModules.length > 0) {
        this.error(`Historical fixtures entered the production graph: ${historicalModules.join(', ')}`);
      }
    },
  }],
});
