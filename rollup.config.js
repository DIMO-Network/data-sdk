import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import globals from 'rollup-plugin-node-globals';

export default {
  input: './src/index.ts',
  output: [
    {
      dir: './dist',
      entryFileNames: 'esm/[name].js',
      format: 'esm',
      sourcemap: true,
    },
    {
      dir: './dist',
      entryFileNames: 'cjs/[name].js',
      format: 'cjs',
      sourcemap: true,
      plugins:[
        globals(),        
      ]
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist/types',
    }), // Handles TypeScript (if needed)
    resolve({ 
      preferBuiltins: true, 
      extensions: ['.js', '.ts'],
    }), // Resolves node_modules and relative paths     
    commonjs(),// Converts CommonJS modules to ES6   
    json(),    
  ],
  onwarn(warning, warn) {
    // Print detailed warnings
    if (warning.code === 'UNRESOLVED_IMPORT') {
      throw new Error(warning.message);
    }
    warn(warning);
  },
};
