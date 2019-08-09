module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  env: {
    node: true,
  },
  extends:  [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
  overrides: [
    {
      files: ['*.spec.ts'],
      extends: [
        'plugin:ava/recommended',
      ],
      rules: {
        "ava/use-test": "off", // https://github.com/avajs/ava/blob/master/docs/recipes/typescript.md
        "@typescript-eslint/no-explicit-any": "off",
      },
    }
  ]
};
