import pluginVue from 'eslint-plugin-vue'
export default [
  ...pluginVue.configs['vue3-recommended'],
  {
    rules: {
      'import/order': ['error', {
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          'type'
        ],
        'pathGroups': [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'vue-router',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'vuex',
            group: 'external',
            position: 'before'
          },
          {
            pattern: 'bootstrap',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@/components/*',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@/utils/*',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@/*',
            group: 'internal',
            position: 'before'
          }
        ],
        'pathGroupsExcludedImportTypes': ['builtin'],
        'newlines-between': 'never',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true
        }
      }],
      'import/no-unresolved': [2, { commonjs: true, amd: true }],
      'no-useless-escape': 'off',
      'import/default': 'off',
      'comma-dangle': ['error', 'never'],
      quotes: ['error', 'single'],
      'no-multiple-empty-lines': ['error', {
        max: 1, maxEOF: 0
      }],
      semi: ['error', 'never'],
      'space-infix-ops': ['error'],
      'object-curly-spacing': ['error', 'always'],
      'no-multi-spaces': ['error'],
      'key-spacing': [
        2,
        {
          'beforeColon': false,
          'afterColon': true
        }
      ],
      indent: ['error', 2, { 'SwitchCase': 1 }],
      'no-trailing-spaces': 'error',
      'padded-blocks': 'off',
      'no-tab': 'off',
      'no-useless-catch': 'off',
      'vue/return-in-computed-property': 'off',
      'vue/html-closing-bracket-newline': [
        'error',
        {
          'multiline': 'never'
        }
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1
          },
          multiline: {
            max: 1
          }
        }
      ],
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'beside',
          multiline: 'below'
        }
      ],
      'vue/v-on-event-hyphenation': ['warn', 'never', {
        autofix: true
      }],
      'vue/attribute-hyphenation': ['error', 'never'],
      'vue/require-explicit-emits': 'off',
      'vue/no-template-shadow': 'off',
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/html-indent': [
        'error',
        2,
        {
          'attribute': 1,
          'baseIndent': 1,
          'closeBracket': 0,
          'alignAttributesVertically': true,
          'ignores': []
        }
      ],
      'vue/require-default-prop': 'off',
      'no-empty': ['error', { 'allowEmptyCatch': true }],
      'no-dupe-else-if': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/require-prop-types': 'off',
      'vue/prop-name-casing': 'off'
    },
  }
]