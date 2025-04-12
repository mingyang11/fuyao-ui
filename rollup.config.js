const clear = require('rollup-plugin-clear');
const postcss = require('rollup-plugin-postcss');
const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  external: ['react', 'react-dom'],
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/esm.js',
      format: 'esm',
    },
    {
      file: 'dist/cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/umd.js',
      format: 'umd',
      name: 'fuyao',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  plugins: [
    clear({
      targets: ['dist', 'es', 'lib'],
    }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    replace({
      'process.env.NODE_ENV': '"production"',
    }),
    postcss({
      // 为true或者有值时css会被打包到单独的文件中，否则会被打包到js文件中
      extract: 'index.css',
      //   plugins: [require('autoprefixer')],
    }),
    // myExtractCssRollupPlugin({
    //   filename: 'fuyao.css',
    // }),
  ],
};
