import js from '@eslint/js';
import globals from 'globals';
// Não precisamos importar nextPlugin e nextConfig separadamente.
// next/core-web-vitals já inclui tudo que precisamos.
// import nextPlugin from '@next/eslint-plugin-next'; 
// import nextConfig from 'eslint-config-next'; 
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

// Importe a configuração base do Next.js diretamente, ela usa o novo formato Flat Config internamente
import nextRecommended from '@next/eslint-plugin-next/configs/recommended.js';
import nextCoreWebVitals from '@next/eslint-plugin-next/configs/core-web-vitals.js';


export default tseslint.config(
  {
    // Adicione a configuração base do ESLint/TSLint e do Next.js aqui.
    // O Next.js já inclui as regras do React Hooks.
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      nextRecommended, // Configuração recomendada do Next.js
      nextCoreWebVitals // Configuração para Core Web Vitals
    ],
    files: ['**/*.{ts,tsx}'],
    // O parserOptions é necessário para a checagem de tipos do TypeScript
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      // O Next.js já gerencia seu próprio plugin. Adicione apenas os que faltam.
      'react-hooks': reactHooks, // Se quiser usar as regras explicitamente aqui
      'react-refresh': reactRefresh,
    },
    rules: {
      // As regras de react-hooks já estão em nextRecommended, mas podemos reforçar
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-floating-promises': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
