import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ignores: ['dist'],
        languageOptions: {
            ecmaVersion: 2020,
            parser: tsParser, // Use TypeScript parser
            globals: globals.browser,
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...js.configs.recommended.rules, // Base JS recommended rules
            ...reactHooks.configs.recommended.rules, // React Hooks rules
            ...tsPlugin.configs.recommended.rules, // TypeScript recommended rules
            '@typescript-eslint/no-unused-expressions': [
                'error',
                {
                    allowShortCircuit: true,
                    allowTernary: true,
                },
            ],
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
        },
    },
];
