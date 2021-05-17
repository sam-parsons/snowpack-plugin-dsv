const plugin = require('../index.js');

describe('snowpack dsv plugin', () => {
  test('invokes plugin without error', () => {
    expect(plugin()).toEqual(true);
  });
});
