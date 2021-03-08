module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  rules: {
    "no-useless-catch": 0,
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
};
