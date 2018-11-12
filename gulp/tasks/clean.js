const del = require('del');

const clean = () => (
  del(['build'])
);

module.exports = clean;
