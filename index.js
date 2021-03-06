const { csvParse, tsvParse, dsvFormat } = require('d3-dsv');
const toSource = require('tosource');
const fs = require('fs');

module.exports = function plugin(config, options) {
  options = Object.assign({}, options);

  const processRows = options.processRows
    ? options.processRows
    : function () {};

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
      else if (fileExt === '.dsv') {
        if (!options.delimiter)
          return new Error(
            'No delimited provided for use with .dsv file',
            filePath
          );
        const parser = parsers['.dsv'](options.delimiter);
        rows = parser.parse(file.toString());
      }
      // handle custom file extensions
      else {
        // fileExt = '.~sv' --> fileExt[1] => '~'
        const delimiter = fileExt[1];
        const parser = parsers['.dsv'](delimiter);
        rows = parser.parse(file.toString());
      }

      // modify rows before output
      if (options.processRows) rows.forEach(options.processRows);

      return `export default ${toSource(rows)};`;
    },
  };
};
