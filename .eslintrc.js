module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "import/prefer-default-export": "off",
    "react/react-in-jsx-scope": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "arrow-body-style": "off",
    "react/require-default-props": "off",
    "no-unused-vars": "warn",
    "comma-dangle": "off",
    "react/jsx-props-no-spreading": "warn",
    "react/function-component-definition": "off",
    "no-shadow": "off",
    "object-curly-newline": "off",
    "import/no-extraneous-dependencies": "off",
    "no-underscore-dangle": "off",
    quotes: ["error", "double"],
    "react/jsx-indent": [2, 2],
    indent: [2, 2],
    "linebreak-style": [
      "error",
      process.platform === "win32" ? "windows" : "unix",
    ],
    "react/jsx-filename-extension": [
      2,
      { extensions: [".tsx", ".ts", ".jsx"] },
    ],
  },
  globals: {
    __IS_DEV__: true,
  },
};
