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
});
