# Contributing

English | [简体中文](./CONTRIBUTING.md)

Thanks for contributing. Please read the conventions below before submitting code.

## Environment

- Node.js >= 20.19.0
- pnpm 10 (the repo pins `packageManager: pnpm@10.32.1`)

```bash
pnpm install
```

The `prepare` script installs Git hooks:

- `pre-commit`: lint and format staged files
- `commit-msg`: validate the message with commitlint

## Commands

```bash
pnpm dev           # watch build
pnpm test          # run tests
pnpm test:watch    # watch tests
pnpm typecheck     # type check
pnpm lint          # lint
pnpm lint:fix      # lint with autofix
pnpm format        # format
pnpm check         # typecheck + lint + format + test + build
pnpm docs:dev      # start the docs site
```

Run at least `pnpm check` before opening a pull request.

## Layout

```
src/
  index.ts            # preset entry: rules, variants, shortcuts, options
  rules/              # rules (border / text / content-visibility)
  shortcuts/          # shortcuts (size / element / layout / motion / effect)
test/
  index.test.ts       # generator-level tests
docs/                 # VitePress docs (Chinese root + /en)
```

## Conventions

- TypeScript must pass `strict` and `noUncheckedIndexedAccess`
- Formatting is handled by `vp fmt` (100 columns, single quotes, no semicolons, trailing commas)
- Avoid one-off abstractions; reuse existing rules and shortcuts
- Update tests and both language versions of the docs when behavior changes

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/). You can use `pnpm commit`.

Allowed types:

`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

Examples:

```
feat: add scrollbar-gutter utilities
fix: normalize negative safe-area offsets
docs: document motion-press theme requirement
```

Mark breaking changes with `!` or a `BREAKING CHANGE:` footer.

## Documentation

The docs site lives in `docs/` and uses VitePress:

- Chinese at the root, English under `docs/en/`
- When adding a page, update the sidebar in `.vitepress/config.ts` and add the other language version

## Release

Maintainers run:

```bash
pnpm check
pnpm changelog
pnpm build
npm publish
```

## Code of conduct

Be kind, stay on topic, and respect contributors from all backgrounds.
