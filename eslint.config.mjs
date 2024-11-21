// eslint.config.mjs
import { defineConfig } from "eslint-define-config";

export default defineConfig({
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
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
    "@typescript-eslint/no-explicit-any": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "18",
    },
  },
});
