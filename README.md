# unocss-preset

[English](./README.en.md) | 简体中文

一个基于 [UnoCSS](https://unocss.dev/) 的预设，提供边框、字号、`content-visibility` 规则，以及布局、元素、动效与交互反馈快捷方式。

完整文档见 [`docs/`](./docs)：

```bash
pnpm docs:dev     # 本地启动文档站
pnpm docs:build   # 构建文档站
```

文档中的示例会在文档站内实时渲染；直接在 GitHub 预览 Markdown 不会加载 UnoCSS 样式。

## 特性

- 边框规则：`b-t-primary`、`b-b-dashed-2-red`、`b-x-dotted-3-primary`
- 字号规则：`text-xs` 到 `text-5xl`，同时输出 `font-size` 与 `line-height`
- `content-visibility`：`cv-auto`、`cv-hidden`、`cv-visible`
- `hocus:` 变体：同时匹配 `:hover` 与 `:focus-visible`
- 快捷方式：尺寸、元素、flex/grid/定位、动效与交互反馈
- 支持 `prefix`

## 安装

```bash
pnpm add -D unocss @starweave-lab/unocss-preset
```

要求 Node.js >= 20.19.0、UnoCSS >= 66。

## 使用

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

预设放在 `presetWind4` 之后，字号规则才能覆盖默认的 `text-*` 尺寸。

```html
<div class="p-6 bg-gray-50">
  <div class="flex-between mb-4">
    <h2 class="text-2md">标题</h2>
    <span class="text-xs text-gray-500">说明</span>
  </div>

  <div class="b-t-2-primary p-3 cv-auto">内容</div>
</div>
```

## 配置项

```ts
interface PresetUnocssOptions {
  /** 为所有工具类和快捷方式添加前缀，例如 `u-` */
  prefix?: string
}
```

```ts
presetUnocss({ prefix: 'u-' })
```

设置前缀后：`u-b-t-primary`、`hocus:u-cv-auto`。

## 规则

### 边框

格式：`b-<方向>[-<样式>][-<宽度>]-<颜色>`

| 工具类                 | 输出                             |
| ---------------------- | -------------------------------- |
| `b-t-primary`          | `border-top: 1px solid primary`  |
| `b-t-dashed-primary`   | `border-top: 1px dashed primary` |
| `b-b-dashed-2-red`     | `border-bottom: 2px dashed red`  |
| `b-l-2-red`            | `border-left: 2px solid red`     |
| `b-x-dotted-3-primary` | 左右边框，3px dotted primary     |
| `b-y-double-1-gray`    | 上下边框，1px double gray        |

### 字号

`text-xs`、`text-sm`、`text-base`、`text-md`、`text-2md`、`text-lg`、`text-xl`、`text-2xl`、`text-3xl`、`text-4xl`、`text-5xl`

每个工具类同时设置 `font-size` 与 `line-height`，具体数值见[规则文档](./docs/guide/rules.md#字号)。

### content-visibility

`cv-auto`、`cv-hidden`、`cv-visible`

### hocus 变体

```html
<button class="hocus:cv-auto">按钮</button>
```

## 快捷方式

| 分类     | 快捷方式                                                                                                                                                                   |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 尺寸     | `full`、`min-full`、`max-full`、`full-flex`                                                                                                                                |
| 元素     | `button`、`reset-button`、`block-button`、`link`、`img-cover`、`img-contain`、`avatar`、`clickable`、`overlay`、`overlay-full`                                             |
| Flex     | `flex-center`、`flex-x-center`、`flex-y-center`、`flex-between`、`flex-between-center`、`flex-center-between`                                                              |
| Grid     | `grid-center`、`grid-x-center`、`grid-y-center`、`grid-stretch`、`grid-between`、`grid-between-center`、`grid-center-between`、`grid-equal-cols`                           |
| 定位     | `absolute-center`、`absolute-x-center`、`absolute-y-center`、`fixed-center`、`fixed-x-center`、`fixed-y-center`                                                            |
| 动效     | `motion-press`、`motion-float`、`motion-scale`、`motion-shrink`、`motion-rotate`、`motion-fade`                                                                            |
| 交互反馈 | `effect-selected`、`effect-focus`、`effect-interactive`、`effect-outline-ring`、`effect-disabled`、`effect-skeleton`、`effect-shadow`、`effect-border`、`effect-highlight` |

部分快捷方式依赖主题中的 `primary` 颜色。展开细节见[快捷方式文档](./docs/guide/shortcuts.md)。

## 开发

```bash
pnpm install          # 安装依赖（同时安装 Git hooks）
pnpm dev              # 监听构建
pnpm test             # 运行测试
pnpm typecheck        # 类型检查
pnpm lint             # lint
pnpm format           # 格式化
pnpm check            # 类型检查 + lint + 格式 + 测试 + 构建
pnpm commit           # czg 交互式提交
pnpm changelog        # 生成 CHANGELOG.md
pnpm docs:dev         # 启动文档站
pnpm build            # 使用 vite-plus 内置 tsdown 打包
```

提交规范与流程见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## License

MIT
