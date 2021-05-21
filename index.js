const { csvParse, tsvParse, dsvFormat } = require('d3-dsv');
const toSource = require('tosource');
const fs = require('fs');

module.exports = function plugin(config, options) {
  options = Object.assign({}, options);

  const delimiters = options.delimiters ? options.delimiters : [];

  const parsers = {
    '.csv': csvParse,
    '.tsv': tsvParse,
    '.dsv': dsvFormat,
    '.psv': dsvFormat,
  };

  return {
    name: 'snowpack-plugin-dsv',
    resolve: {
      input: ['.psv', '.csv', '.tsv', '.dsv', ...delimiters],
      output: ['.js'],
    },
    load({ filePath, fileExt }) {
      const file = fs.readFileSync(filePath);
      let rows;
      // handle csv and tsv parsing
      if (['.csv', '.tsv'].includes(fileExt)) {
        rows = parsers[fileExt](file.toString());
      }
      // use dsvFormat() with | delimiter
      else if (fileExt === '.psv') {
        rows = parsers[fileExt]('|').parse(file.toString());
      }
      // handle .dsv files with custom delimiter
      else if (options.delimiter && fileExt === '.dsv') {
        const parser = parsers['.dsv'](options.delimiter);
        rows = parser.parse(file.toString());
      }
      // handle custom file extensions
      else {
        const delimiter = filePath.slice(-3, -2);
        const parser = parsers['.dsv'](delimiter);
        rows = parser.parse(file.toString());
      }

      return `export default ${toSource(rows)};`;
    },
  };
};
