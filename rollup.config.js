import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import globals from 'rollup-plugin-node-globals';


export default {
  input: './src/index.ts',
  output: {
    file: './dist/index.cjs',
    format: 'cjs',
  },
  plugins: [
    resolve({ preferBuiltins: true }), // Resolves node_modules and relative paths
    commonjs(), // Converts CommonJS modules to ES6
    typescript(), // Handles TypeScript (if needed)
    json(),
    globals(),
  ],
  onwarn(warning, warn) {
    // Print detailed warnings
    if (warning.code === 'UNRESOLVED_IMPORT') {
      throw new Error(warning.message);
    }
    warn(warning);
  },
};
