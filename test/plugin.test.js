const plugin = require('../index.js');

describe('snowpack dsv plugin', () => {
  test('invokes plugin without error', () => {
    expect(plugin()).toHaveProperty('name');
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

  test('load function return value matches snapshot with custom file extension', () => {
    const obj = plugin({}, { delimiters: ['.~sv'] });
    const res = obj.load({
      fileExt: '.dsv',
      filePath: './test/fixtures/data.~sv',
    });
    expect(res).toMatchSnapshot();
  });
});
