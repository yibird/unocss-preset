# Getting Started

## Install

```bash
pnpm add -D unocss @starweave-lab/unocss-preset
```

Requires Node.js >= 20.19.0 and UnoCSS >= 66.

## Configure

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

Register the preset after `presetWind4` so its text-size rules override the
default `text-*` sizes.

Theme colors such as `primary` are used by some border utilities and shortcuts;
adjust them for your project.

## Use

```html
<div class="p-6 bg-gray-50">
  <div class="flex-between mb-4">
    <h2 class="text-2md">Title</h2>
    <span class="text-xs text-gray-500">Description</span>
  </div>

  <div class="b-t-2-primary p-3 cv-auto">Content</div>
</div>
```

Result:

<div class="p-6 bg-gray-50 rounded-xl mt-4 max-w-xl">
  <div class="flex-between mb-4">
    <div class="text-2md font-semibold">Title</div>
    <span class="text-xs text-gray-500">Description</span>
  </div>
  <div class="b-t-2-primary p-3 cv-auto text-sm">Content</div>
</div>

## Overview

- Borders: `b-t-primary`, `b-b-dashed-2-red`, `b-x-dotted-3-primary`
- Text sizes: `text-xs` through `text-5xl`, setting both `font-size` and `line-height`
- `content-visibility`: `cv-auto`, `cv-hidden`, `cv-visible`
- `hocus:` variant matching both `:hover` and `:focus-visible`
- Shortcuts: size, element, layout, motion and interaction effects

## Next

- [Rules](/en/guide/rules)
- [Shortcuts](/en/guide/shortcuts)
- [Options](/en/guide/options)
- [Demo](/en/guide/demo)
