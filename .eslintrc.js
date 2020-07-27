const path = require("path");

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        "airbnb-typescript",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "react-hooks", "graphql"],
    rules: {
        "react/jsx-indent": [0],
        "react/jsx-indent-props": [0]
    },
};
