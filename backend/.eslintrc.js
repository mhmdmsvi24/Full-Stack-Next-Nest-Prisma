module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // This should handle Prettier conflicts
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"], // Make sure this doesn't ignore your src folder
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Apply these rules to TypeScript files
      rules: {
        // TypeScript-specific rules
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
  rules: {
    // General rules
    "prettier/prettier": [
      "error",
      {
        semi: true, // or false if you prefer no semicolons
        singleQuote: false,
      },
    ],
  },
};
