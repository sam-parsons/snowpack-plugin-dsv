const plugin = require('../index.js');

describe('snowpack dsv plugin', () => {
  test('invokes plugin and returns correctly shaped object without error', () => {
    const obj = plugin();
    expect(obj.name).toEqual('snowpack-plugin-dsv');
    expect(obj.resolve).toEqual({
      input: ['.psv', '.csv', '.tsv', '.dsv'],
      output: ['.js'],
    });
    expect(typeof obj.load).toEqual('function');
  });

  test('load function return value matches snapshot with csv input', () => {
    const obj = plugin();
    const res = obj.load({
      fileExt: '.csv',
      filePath: './test/fixtures/data.csv',
    });
    expect(res).toMatchSnapshot();
  });

  test('load function return value matches snapshot with tsv input', () => {
    const obj = plugin();
    const res = obj.load({
      fileExt: '.tsv',
      filePath: './test/fixtures/data.tsv',
    });
    expect(res).toMatchSnapshot();
  });

  test('load function return value matches snapshot with psv input', () => {
    const obj = plugin();
    const res = obj.load({
      fileExt: '.psv',
      filePath: './test/fixtures/data.psv',
    });
    expect(res).toMatchSnapshot();
  });

  test('load function return value matches snapshot with default dsv input', () => {
    const obj = plugin({}, { delimiter: ':' });
    const res = obj.load({
      fileExt: '.dsv',
      filePath: './test/fixtures/data.dsv',
    });
    expect(res).toMatchSnapshot();
  });

  test('load function returns error when parsing .dsv file without delimiter options object', () => {
    const obj = plugin();
    const error = obj.load({
      fileExt: '.dsv',
      filePath: './test/fixtures/data.dsv',
    });
    expect(error.message).toEqual(
      'No delimited provided for use with .dsv file'
    );
  });

  test('load function return value matches snapshot with custom file extension', () => {
    const obj = plugin({}, { delimiters: ['.~sv'] });
    const res = obj.load({
      fileExt: '.~sv',
      filePath: './test/fixtures/data.~sv',
    });
    expect(res).toMatchSnapshot();
  });

  test('load function return value matches snapshot with multiple custom file extensions', () => {
    const obj = plugin({}, { delimiters: ['.~sv', '.%sv'] });
    // both files should result in the same string
    const resI = obj.load({
      fileExt: '.~sv',
      filePath: './test/fixtures/data.~sv',
    });
    const resII = obj.load({
      fileExt: '.%sv',
      filePath: './test/fixtures/data.%sv',
    });
    expect(resI).toEqual(resII);
  });

  test('uses processRows to alter output', () => {
    const obj = plugin(
      {},
      {
        processRows: (row, id) => {
          Object.keys(row).forEach((key, id) => {
            let value = row[key].trim();
            row[key] = isNaN(Number(value)) ? value : Number(value);
          });
        },
      }
    );
    const res = obj.load({
      fileExt: '.csv',
      filePath: './test/fixtures/prdata.csv',
    });
    expect(res).toMatchSnapshot();
  });
});
