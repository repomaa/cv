module.exports = {
  plugins: ['prettier-plugin-svelte'],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
  ],
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  svelteSortOrder: 'options-scripts-markup-styles',
  svelteStrictMode: false,
  svelteBracketNewLine: true,
  svelteAllowShorthand: true,
};
