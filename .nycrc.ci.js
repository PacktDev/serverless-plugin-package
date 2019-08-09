const coverage = require('./.nycrc');

const overrides = {
  checkCoverage: false,
  reporter: [
    'none'
  ],
};

const ciCoverage = Object.assign(
  {},
  coverage,
  overrides,
);

module.exports = ciCoverage;
