const { csvParse } = require('d3-dsv');
const toSource = require('tosource');
const fs = require('fs');
const path = require('path');

module.exports = function plugin(config, options) {
  console.log('plugin invoked');
  // console.log('config', config);
  // console.log('options', options);
  return {
    name: 'snowpack-plugin-dsv',
    resolve: {
      input: ['.csv'],
      output: ['.js'],
    },
    load({ filePath, fileExt }) {
      console.log('load event');
      console.log('filePath', filePath);
      console.log('fileExt', fileExt);
      const csv = fs.readFileSync(filePath);
      console.log('csv', csv.toString());
      const rows = csvParse(csv.toString());
      console.log('rows', rows);
      return `export default ${toSource(rows)};`;
    },
  };
};
