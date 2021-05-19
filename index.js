const { csvParse, tsvParse } = require('d3-dsv');
const toSource = require('tosource');
const fs = require('fs');

module.exports = function plugin(config, options) {
  const parsers = {
    '.csv': csvParse,
    '.tsv': tsvParse,
  };

  return {
    name: 'snowpack-plugin-dsv',
    resolve: {
      input: ['.csv', '.tsv'],
      output: ['.js'],
    },
    load({ filePath, fileExt }) {
      const file = fs.readFileSync(filePath);
      const rows = parsers[fileExt](file.toString());
      return `export default ${toSource(rows)};`;
    },
  };
};
