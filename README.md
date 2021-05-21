[npm]: https://img.shields.io/npm/v/snowpack-plugin-dsv
[npm-url]: https://www.npmjs.com/package/snowpack-plugin-dsv
[size]: https://packagephobia.now.sh/badge?p=snowpack-plugin-dsv
[size-url]: https://packagephobia.now.sh/result?p=snowpack-plugin-dsv

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

# snowpack-plugin-dsv

Snowpack plugin that converts `.csv` and `.tsv` files into JavaScript modules with [d3-dsv](https://github.com/d3/d3-dsv).

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v8.0.0+) and Snowpack v2.0.0+.

## Install

Using npm:

```console
npm install --save-dev snowpack-plugin-dsv
```

## Usage

Create a `snowpack.config.js` [configuration file](https://www.snowpack.dev/reference/configuration) and import the plugin to automatically detect and parse `.csv`, `.tsv`, and `.psv` files:

```js
const dsv = require('snowpack-plugin-dsv');

module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: ['snowpack-plugin-dsv'],
};
```

For other types of delimiters, set the `delimiter` property of the options object to the appropriate character. Note: You will have to set the file extension of your custom files to `.dsv`.

```js
const dsv = require('snowpack-plugin-dsv');

module.exports = {
  mount: { ... },
  plugins: [['snowpack-plugin-dsv', { delimiter: '~' }]],
};
```

If you would like to use multiple files with different delimiters, populate the `delimiters` array with the appropriate file extensions. Note: Make sure the second character of the custom file <i>is</i> the delimiter used in the data. Ex: If delimiting by `~`, the file extension should be `.~sv`.

```js
const dsv = require('snowpack-plugin-dsv');

module.exports = {
  mount: { ... },
  plugins: [['snowpack-plugin-dsv', { delimiters: ['.~sv', '.%sv'] }]],
};
```

## Practical Example

Suppose that you have a CSV (or TSV!) file which contains some information on delicious fruits:

```csv
type,count
apples,7
pears,4
bananas,5
```

And suppose you'd like to import that CSV as an `Array` within some part of your code. After adding the plugin (as shown above), you may `import` (or `require`) the CSV file directly. The import will provide an `Array` of `Objects` representing rows from the CSV file:

```js
import fruit from './fruit.csv';

console.log(fruit);
// [
//   { type: 'apples', count: '7' },
//   { type: 'pears', count: '4' },
//   { type: 'bananas', count: '5' }
// ]
```

## Meta

[LICENSE (MIT)](./LICENSE.md)
