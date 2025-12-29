import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
// 1. Importe o plugin do React Compiler
import reactCompiler from 'eslint-plugin-react-compiler';

import nextRecommended from '@next/eslint-plugin-next/configs/recommended.js';
import nextCoreWebVitals from '@next/eslint-plugin-next/configs/core-web-vitals.js';

export default tseslint.config(
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      nextRecommended, 
      nextCoreWebVitals 
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      
      // 3. Adicione a regra do compilador
      'react-compiler/react-compiler': 'error', 
      
      '@typescript-eslint/no-floating-promises': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);