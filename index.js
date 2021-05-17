module.exports = function plugin(config, options) {
  console.log('plugin invoked');
  console.log('config', config);
  console.log('options', options);
  return true;
};
