import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'


export default {
  input: 'replServer/src/server.ts',
  output: {
    file: 'replServer/dist/server.js',
    format: 'cjs'
  },
  plugins: [
    typescript({tsconfig: "./tsconfig.server.json"}), 
    resolve({modulesOnly: true}),
    commonJS({
      include: 'node_modules/**'
    }),
    json()
  ]
};