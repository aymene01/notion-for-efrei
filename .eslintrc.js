module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-var-requires": "off"
  },
  "env": {
    "browser": true,
    "es2021": true
  },
  "ignorePatterns": [
    "node_modules/",
    "dist/"
  ]
}