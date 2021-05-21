const { csvParse, tsvParse, dsvFormat } = require('d3-dsv');
const toSource = require('tosource');
const fs = require('fs');

module.exports = function plugin(config, options) {
  options = Object.assign({}, options);

  const parsers = {
    '.csv': csvParse,
    '.tsv': tsvParse,
    '.dsv': dsvFormat,
    '.psv': dsvFormat('|'),
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
      // handle custom delineators
      if (options.delimiter) {
        const parser = parsers['.dsv'](options.delimiter);
        rows = parser.parseRows(file.toString());
      }
      // use dsvFormat with | delineator
      else if (fileExt === '.psv') {
        rows = parsers[fileExt].parseRows(file.toString());
      }
      // handle csv and tsv parsing
      else {
        rows = parsers[fileExt](file.toString());
      }
      return `export default ${toSource(rows)};`;
    },
  };
};
