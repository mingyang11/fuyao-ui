const extractArr = [];

function myExtractCssRollupPlugin(opts) {
  return {
    name: 'my-extract-css-rollup-plugin',
    transform(code, id) {
      if (!id.endsWith('.css')) {
        return null;
      }

      extractArr.push(code);

      return {
        code: 'export default undefined',
        map: { mappings: '' },
      };
    },
    generateBundle(options, bundle) {
      this.emitFile({
        fileName: opts.filename || 'index.css',
        type: 'asset',
        source: extractArr.join('\n'),
      });
    },
  };
}

module.exports = myExtractCssRollupPlugin;
