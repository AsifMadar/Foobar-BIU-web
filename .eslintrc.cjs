module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'react-app',
        'react-app/jest',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'init-declarations': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'react/react-in-jsx-scope': 'off',
    },
}
