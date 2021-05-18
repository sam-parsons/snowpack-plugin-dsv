const { csvParse, tsvParse } = require('d3-dsv');
const toSource = require('tosource');
const fs = require('fs');
const path = require('path');

module.exports = function plugin(config, options) {
  console.log('plugin invoked');
  // console.log('config', config);
  // console.log('options', options);
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
      console.log('load event');
      console.log('filePath', filePath);
      console.log('fileExt', fileExt);
      const file = fs.readFileSync(filePath);
      console.log('csv', file.toString());
      const rows = parsers[fileExt](file.toString());
      console.log('rows', rows);
      return `export default ${toSource(rows)};`;
    },
  };
};
