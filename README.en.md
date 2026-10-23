# unocss-preset

English | [简体中文](./README.md)

A [UnoCSS](https://unocss.dev/) preset with border, text-size and
`content-visibility` rules, plus layout, element, motion and interaction
shortcuts.

Full documentation lives in [`docs/`](./docs):

```bash
pnpm docs:dev     # start the docs site
pnpm docs:build   # build the docs site
```

Examples render live on the docs site; previewing the Markdown on GitHub does
not load UnoCSS styles.

## Features

- Border rules: `b-t-primary`, `b-b-dashed-2-red`, `b-x-dotted-3-primary`
- Text-size rules: `text-xs` through `text-5xl`, emitting both `font-size` and `line-height`
- `content-visibility`: `cv-auto`, `cv-hidden`, `cv-visible`
- `hocus:` variant matching both `:hover` and `:focus-visible`
- Shortcuts: size, element, flex/grid/position, motion and interaction effects
- Optional `prefix`

The docs include a [live demo](./docs/en/guide/demo.md) rendered with the preset.

## Install

```bash
pnpm add -D unocss @starweave-lab/unocss-preset
```

Requires Node.js >= 20.19.0 and UnoCSS >= 66.

## Usage

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import { presetWind4 } from '@unocss/preset-wind4'
import presetUnocss from '@starweave-lab/unocss-preset'

export default defineConfig({
  presets: [presetWind4(), presetUnocss()],
  theme: {
    colors: {
      primary: '#3b82f6',
    },
  },
})
```

Register the preset after `presetWind4` so its text sizes override the defaults.

```html
<div class="p-6 bg-gray-50">
  <div class="flex-between mb-4">
    <h2 class="text-2md">Title</h2>
    <span class="text-xs text-gray-500">Description</span>
  </div>

  <div class="b-t-2-primary p-3 cv-auto">Content</div>
</div>
```

## Options

```ts
interface PresetUnocssOptions {
  /** Prefix applied to every utility and shortcut, for example `u-`. */
  prefix?: string
}
```

```ts
presetUnocss({ prefix: 'u-' })
```

With a prefix, use `u-b-t-primary` and `hocus:u-cv-auto`.

## Rules

### Border

Syntax: `b-<direction>[-<style>][-<width>]-<color>`

| Utility                | Output                           |
| ---------------------- | -------------------------------- |
| `b-t-primary`          | `border-top: 1px solid primary`  |
| `b-t-dashed-primary`   | `border-top: 1px dashed primary` |
| `b-b-dashed-2-red`     | `border-bottom: 2px dashed red`  |
| `b-l-2-red`            | `border-left: 2px solid red`     |
| `b-x-dotted-3-primary` | left/right, 3px dotted primary   |
| `b-y-double-1-gray`    | top/bottom, 1px double gray      |

### Text size

`text-xs`, `text-sm`, `text-base`, `text-md`, `text-2md`, `text-lg`, `text-xl`,
`text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`

Each utility sets both `font-size` and `line-height`; see the
[rules docs](./docs/en/guide/rules.md#text-size) for values.

### content-visibility

`cv-auto`, `cv-hidden`, `cv-visible`

### hocus variant

```html
<button class="hocus:cv-auto">Button</button>
```

## Shortcuts

| Group       | Shortcuts                                                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Size        | `full`, `min-full`, `max-full`, `full-flex`                                                                                                                                |
| Element     | `button`, `reset-button`, `block-button`, `link`, `img-cover`, `img-contain`, `avatar`, `clickable`, `overlay`, `overlay-full`                                             |
| Flex        | `flex-center`, `flex-x-center`, `flex-y-center`, `flex-between`, `flex-between-center`, `flex-center-between`                                                              |
| Grid        | `grid-center`, `grid-x-center`, `grid-y-center`, `grid-stretch`, `grid-between`, `grid-between-center`, `grid-center-between`, `grid-equal-cols`                           |
| Position    | `absolute-center`, `absolute-x-center`, `absolute-y-center`, `fixed-center`, `fixed-x-center`, `fixed-y-center`                                                            |
| Motion      | `motion-press`, `motion-float`, `motion-scale`, `motion-shrink`, `motion-rotate`, `motion-fade`                                                                            |
| Interaction | `effect-selected`, `effect-focus`, `effect-interactive`, `effect-outline-ring`, `effect-disabled`, `effect-skeleton`, `effect-shadow`, `effect-border`, `effect-highlight` |

Some shortcuts require the `primary` theme color. See the
[shortcuts docs](./docs/en/guide/shortcuts.md) for expansions.

## Development

```bash
pnpm install          # install dependencies (and Git hooks)
pnpm dev              # watch build
pnpm test             # run tests
pnpm typecheck        # type check
pnpm lint             # lint
pnpm format           # format
pnpm check            # typecheck + lint + format + test + build
pnpm commit           # interactive commit (czg)
pnpm changelog        # generate CHANGELOG.md
pnpm docs:dev         # start the docs site
pnpm build            # bundle with vite-plus (tsdown)
```

See [CONTRIBUTING.en.md](./CONTRIBUTING.en.md) for the contribution workflow.

## License

MIT
