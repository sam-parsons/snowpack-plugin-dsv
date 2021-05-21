const { csvParse, tsvParse, dsvFormat } = require('d3-dsv');
const toSource = require('tosource');
const fs = require('fs');

module.exports = function plugin(config, options) {
  options = Object.assign({}, options);

  const parsers = {
    '.csv': csvParse,
    '.tsv': tsvParse,
    '.dsv': dsvFormat,
  };

  return {
    name: 'snowpack-plugin-dsv',
    resolve: {
      input: ['.psv', '.csv', '.tsv', '.dsv'],
      output: ['.js'],
    },
    load({ filePath, fileExt }) {
      const file = fs.readFileSync(filePath);
      let rows;
      if (options.delimiter) {
        const parser = parsers['.dsv'](options.delimiter);
        rows = parser.parseRows(file.toString());
      } else {
        rows = parsers[fileExt](file.toString());
      }
      return `export default ${toSource(rows)};`;
    },
  };
};
