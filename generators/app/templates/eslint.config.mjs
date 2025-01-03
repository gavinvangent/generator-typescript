import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { ignores: [] },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            semi: ['error', 'never'],
            indent: ['error', 2, { "SwitchCase": 1 }],
            'one-var': ['error', 'never'],
            'no-else-return': 'error',
            'no-lonely-if': 'error',
            'no-async-promise-executor': 'off',
            'no-fallthrough': 'off',
            'prefer-spread': 'off',

            'no-unused-vars': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-expicit-any': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
        }
    },
    {
        // This block introduces eslint-plugin-unused-imports to override @typescript-eslint/no-unused-vars
        plugins: {
            'unused-imports': unusedImports,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error'
        }
    }
];
