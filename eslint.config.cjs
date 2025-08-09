module.exports = {
  // Le nouveau format 'flat config' a un nom de fichier différent (.eslintrc.js)
  // et utilise une syntaxe différente. Cette version reste dans le format "legacy"
  // mais avec des plugins à jour.
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended', // Recommandé pour les hooks React
    'prettier', // Toujours en dernier pour désactiver les règles conflictuelles
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  ignorePatterns: [
    'node_modules',
    '.commitlintrc.json',
    '.eslintrc.json',
    '.gitattributes',
    '.gitignore',
    '.prettierrc.json',
    '.prettierignore',
    'LICENSE',
    'package-lock.json',
    'pnpm-lock.yaml',
    'pnpm-workspace.yaml',
    'package.json',
    'README.md',
    '.husky',
    '.github',
    'dist',
  ],
};
