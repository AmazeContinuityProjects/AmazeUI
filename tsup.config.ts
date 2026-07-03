import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/tailwind.css'],
  format: ['cjs', 'esm'],
  dts: {
    entry: 'src/index.ts'
  },
  external: ['react', 'react-dom', 'react-native', 'react-native-web', 'framer-motion'],
  clean: true,
  sourcemap: true,
  loader: {
    '.css': 'copy'
  },
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  }
});
