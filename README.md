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

Create a `snowpack.config.js` [configuration file](https://www.snowpack.dev/reference/configuration) and import the plugin:

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

### `processRow`

Type: `Function`<br>
Default: `null`

Specifies a function which processes each row in the parsed array. The function can either manipulate the passed `row`, or return an entirely new row object.

This option could be used for converting numeric `string` values into `Number` values. – for example turning numeric values into numbers, e.g.

```js
dsv({
  processRow: (row, id) => {
    Object.keys(row).forEach((key) => {
      var value = row[key];
      row[key] = isNaN(+value) ? value : +value;
    });
  },
});
```

## Meta

[CONTRIBUTING](./.github/CONTRIBUTING.md)

[LICENSE (MIT)](./LICENSE)
