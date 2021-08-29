module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: ['**/LText.spec.ts'],
  transformIgnorePatterns: [
    '/!node_modules\\/lodash-es/',
    '/!node_modules\\/rgb-hex/',
  ],
}
