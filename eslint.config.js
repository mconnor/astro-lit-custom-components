// @ts-check
import astroParser from "astro-eslint-parser";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import js from "@eslint/js";
// import markdown from "eslint-plugin-markdown";
import tseslint from "typescript-eslint";
// import typescriptParser from '@typescript-eslint/parser';
// import * as regexpPlugin from "eslint-plugin-regexp";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ref: https://eslint.org/docs/latest/use/configure/migration-guide#using-eslintrc-configs-in-flat-config
// mimic CommonJS variables -- not needed if using CommonJS
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  ...eslintPluginAstro.configs.recommended,
  ...compat.extends("plugin:lit/recommended"),
  ...compat.extends("plugin:wc/recommended"),
  ...compat.extends("plugin:regexp/recommended"),

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectServices: true,

        // For example, if you use a specific tsconfig.eslint.json for linting, you'd specify:
        tsconfigRootDir: import.meta.dirname,
        parser: tseslint.parser,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["src/**/*.astro"],
    ...tseslint.configs.disableTypeChecked,

    languageOptions: {
      parser: astroParser,
    },

    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "lit/no-invalid-html": "warn",
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },

  {
    // disable type-aware linting on JS files
    files: ["**/*.js", "**/*.mjs"],
    ...tseslint.configs.disableTypeChecked,
  },
  // {
  //   plugins: {
  //     markdown,
  //   },
  // },

  // {
  //   files: ["src/**/*.md"],
  //   processor: "markdown/markdown",
  //   rules: {
  //     // ...
  //   },
  // },
  {
    // 1. Target ```js code blocks in .md files.
    files: ["**/*.md/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    // disable type-aware linting on JS files
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ignores: [
      "my-custom-build-directory",
      "**/_*.astro",
      "**/temp.js",
      "config/*",
      "pnpm-lock.yaml",
      "types.generated.d.ts",
      ".astro/",
      "dist/",
      "my-custom-cache-directory",
      "src/env.d.ts",
    ],
  },
  eslintConfigPrettier, // eslint-config-prettier last
);
