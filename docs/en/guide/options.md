# Options

```ts
interface PresetUnocssOptions {
  /**
   * Prefix applied to every generated utility and shortcut, for example `u-`.
   * @default undefined
   */
  prefix?: string
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
