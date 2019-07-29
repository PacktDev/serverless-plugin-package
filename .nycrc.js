const required = 95;
const watermark = [95, 98];

module.exports =  {
  extends: '@istanbuljs/nyc-config-typescript',
  all: true,
  extension: [
    '.ts',
  ],
  exclude: [
    '**/*.d.ts',
    '**/*.spec.ts',
    '**/*rc.js',
  ],
  branches: required,
  lines: required,
  functions: required,
  statements: required,
  watermarks: {
    lines: watermark,
    functions: watermark,
    branches: watermark,
    statements: watermark,
  },
  checkCoverage: true,
  reporter: [
    'lcov',
    'text',
  ],
};
