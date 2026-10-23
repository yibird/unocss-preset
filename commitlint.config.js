/** @type {import('cz-git').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    types: [
      { value: 'feat', name: 'feat:     A new feature' },
      { value: 'fix', name: 'fix:      A bug fix' },
      { value: 'docs', name: 'docs:     Documentation only changes' },
      { value: 'style', name: 'style:    Changes that do not affect the meaning of the code' },
      {
        value: 'refactor',
        name: 'refactor: A code change that neither fixes a bug nor adds a feature',
      },
      { value: 'perf', name: 'perf:     A code change that improves performance' },
      { value: 'test', name: 'test:     Adding missing tests or correcting existing tests' },
      { value: 'build', name: 'build:    Changes that affect the build system or dependencies' },
      { value: 'ci', name: 'ci:       Changes to CI configuration files and scripts' },
      { value: 'chore', name: 'chore:    Other changes that do not modify src or test files' },
      { value: 'revert', name: 'revert:   Revert a previous commit' },
    ],
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    upperCaseSubject: false,
    markBreakingChangeMode: true,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    confirmColorize: true,
  },
}
