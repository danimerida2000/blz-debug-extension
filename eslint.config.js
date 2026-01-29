import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
    // Ignore patterns
    {
        ignores: ['dist/**', 'dist-zip/**', 'node_modules/**', '*.config.js'],
    },

    // Base JavaScript config
    js.configs.recommended,

    // TypeScript files
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports' },
            ],
        },
    },

    // Vue files
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                ecmaVersion: 'latest',
                sourceType: 'module',
                extraFileExtensions: ['.vue'],
            },
        },
        plugins: {
            vue: vuePlugin,
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...vuePlugin.configs['vue3-recommended'].rules,
            'vue/multi-word-component-names': 'off',
            'vue/html-self-closing': [
                'error',
                {
                    html: { void: 'always', normal: 'always', component: 'always' },
                    svg: 'always',
                    math: 'always',
                },
            ],
            'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        },
    },

    // JavaScript files (legacy support during migration)
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        rules: {
            'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
    },

    // Browser extension specific rules
    {
        files: ['src/**/*.ts', 'src/**/*.js'],
        languageOptions: {
            globals: {
                browser: 'readonly',
                chrome: 'readonly',
                Blz: 'readonly',
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                HTMLElement: 'readonly',
                MouseEvent: 'readonly',
                KeyboardEvent: 'readonly',
            },
        },
    },

    // Prettier compatibility (must be last)
    prettierConfig,
];
