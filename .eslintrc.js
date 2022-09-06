module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "tsconfig.json",
  },
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint", "react", "import", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "prettier",
    "plugin:storybook/recommended",
  ],

  rules: {
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */
          caseInsensitive: true,
          /* ignore case. Options: [true, false] */
        },
        groups: [
          "external",
          "builtin",
          "index",
          "sibling",
          "parent",
          "internal",
          "object",
        ],
        "newlines-between": "always",
      },
    ],
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/display-name": "off",
    "storybook/default-exports": "off",
    "no-console": "warn",
    "no-debugger": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
