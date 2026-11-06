import { readFileSync } from 'node:fs';
import { builtinModules } from 'node:module';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { dts } from 'rollup-plugin-dts';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const dependencies = Object.keys(pkg.dependencies ?? {});

const external = (id) =>
  id.startsWith('node:') ||
  builtinModules.includes(id) ||
  dependencies.some((dep) => id === dep || id.startsWith(`${dep}/`));

const bundle = {
  input: './src/index.ts',
  external,
  output: [
    {
      dir: './dist',
      entryFileNames: 'esm/[name].js',
      format: 'esm',
      sourcemap: true,
    },
    {
      dir: './dist',
      entryFileNames: 'cjs/[name].cjs',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
    }),
    resolve({
      preferBuiltins: true,
      extensions: ['.js', '.ts'],
    }),
    commonjs(),
    json(),
  ],
  onwarn(warning, warn) {
    if (warning.code === 'UNRESOLVED_IMPORT') {
      throw new Error(warning.message);
    }
    warn(warning);
  },
};

const types = {
  input: './src/index.ts',
  external,
  output: [
    { file: './dist/types/index.d.ts', format: 'es' },
    { file: './dist/types/index.d.cts', format: 'es' },
  ],
  plugins: [dts()],
};

export default [bundle, types];
