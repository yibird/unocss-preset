# Options

```ts
interface PresetUnocssOptions {
  /**
   * Prefix applied to every generated utility and shortcut, for example `u-`.
   * @default undefined
   */
  prefix?: string
  /**
   * Extra color tokens available to border utilities, in addition to theme.colors.
   * @default undefined
   */
  borderColors?: Record<string, unknown>
}
```

## prefix

```ts
presetUnocss({ prefix: 'u-' })
```

Utilities and shortcuts must then use the prefix:

```html
<div class="u-p-6 u-flex-between u-b-t-primary">...</div>
```

Variants stay outside the prefix:

```html
<button class="hocus:u-cv-auto">Button</button>
```

## borderColors

If your border color tokens are defined through custom UnoCSS rules instead of
`theme.colors`, this preset cannot read those rules. Pass the tokens to
`borderColors` so `b-*` utilities can resolve them:

```ts
const borderColorTokens = {
  main: 'rgb(var(--w-border-main))',
  regular: 'rgb(var(--w-border-regular))',
}

export default defineConfig({
  presets: [presetWind4(), presetUnocss({ borderColors: borderColorTokens })],
})
```

```html
<div class="b-1-[border-regular]"></div>
<div class="b-1-regular"></div>
```

## Combining with presetWind4

```ts
export default defineConfig({
  presets: [presetWind4(), presetUnocss()],
})
```

- The preset only depends on `@unocss/core`
- Text-size rules override the matching `text-*` sizes from `presetWind4`, so
  register this preset last
- Base utilities used by shortcut expansions (`flex`, `w-full`, ...) come from
  `presetWind4`

The `primary` theme color is used by some border utilities and shortcuts:

```ts
theme: {
  colors: {
    primary: '#3b82f6',
  },
}
```
