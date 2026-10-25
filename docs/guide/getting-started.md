# 快速开始

## 安装

```bash
pnpm add -D unocss @starweave-lab/unocss-preset
```

要求 Node.js >= 20.19.0、UnoCSS >= 66。

## 配置

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

预设应放在 `presetWind4` 之后，这样字号规则才能覆盖默认的 `text-*` 尺寸。

`primary` 等主题颜色用于部分边框与快捷方式，可按项目需要替换。

## 使用

```html
<div class="p-6 bg-gray-50">
  <div class="flex-between mb-4">
    <h2 class="text-2md">标题</h2>
    <span class="text-xs text-gray-500">说明</span>
  </div>

  <div class="b-t-2-primary p-3 cv-auto">内容</div>
</div>
```

效果：

<div class="p-6 bg-gray-50 rounded-xl mt-4 max-w-xl">
  <div class="flex-between mb-4">
    <div class="text-2md font-semibold">标题</div>
    <span class="text-xs text-gray-500">说明</span>
  </div>
  <div class="b-t-2-primary p-3 cv-auto text-sm">内容</div>
</div>

## 能力一览

- 边框：`b-t-primary`、`b-b-dashed-2-red`、`b-x-dotted-3-primary`
- 字号：`text-xs` 到 `text-5xl`，同时设置 `font-size` 与 `line-height`
- `content-visibility`：`cv-auto`、`cv-hidden`、`cv-visible`
- `hocus:` 变体：同时匹配 `:hover` 与 `:focus-visible`
- 快捷方式：尺寸、元素、布局、动效、交互反馈

## 下一步

- [规则](/guide/rules)
- [快捷方式](/guide/shortcuts)
- [配置项](/guide/options)
