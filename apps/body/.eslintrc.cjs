module.exports = {
  root: true,
  env: {
    jest: true,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  extends: ['@react-esm-native-microfrontends'],
  settings: {
    'import/resolver': {
      node: true,
      typescript: {
        project: 'apps/body/tsconfig.json',
      },
    },
  },
}
