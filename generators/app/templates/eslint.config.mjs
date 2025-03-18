import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { ignores: ['src/routes/routes.ts'] },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            semi: ['error', 'always'],
            indent: ['error', 4, { "SwitchCase": 1 }],
            "one-var": ['error', 'never'],
            "no-else-return": 'error',
            "no-lonely-if": 'error',
            "no-async-promise-executor": 'off',
            "no-fallthrough": "off",
            'prefer-spread': "off",

            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ['error', {
                'argsIgnorePattern': "^_|context",
            }],

            "no-explicit-any": 'off',
            "@typescript-eslint/no-explicit-any": 'off',
            "@typescript-eslint/no-unused-expressions": 'off',
            "@typescript-eslint/no-empty-object-type": 'off'
        },
    }
];