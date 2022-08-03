module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        'project': 'tsconfig.json',
        'tsconfigRootDir': __dirname,
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    env: {node: true},
    ignorePatterns: ['**/*.js'],
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        'semi': ["error", "always"],
        'prefer-const': 'warn',
        'no-duplicate-imports': 'error',
        'no-else-return': 'warn',
        'no-multi-spaces': 'warn',
        'object-curly-spacing': ['error', 'always'],
        'quotes': ['warn', 'single'],
        'padding-line-between-statements': [
            'warn',
            {
                'blankLine': 'always',
                'prev': '*',
                'next': ['return', 'switch', 'if', 'for', 'while'],
            },
            {
                'blankLine': 'always',
                'prev': ['if', 'switch', 'for', 'while'],
                'next': '*',
            },
            {
                'blankLine': 'always',
                'prev': ['const', 'let', 'var'],
                'next': '*',
            },
            {
                'blankLine': 'any',
                'prev': ['const', 'let', 'var'],
                'next': ['const', 'let', 'var'],
            },
        ],
        'no-use-before-define': [
            'error',
            {
                'functions': false,
                'classes': false,
            },
        ],
    },
}
