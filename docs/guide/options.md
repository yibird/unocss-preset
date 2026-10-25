# 配置项

```ts
interface PresetUnocssOptions {
  /**
   * 为所有生成的工具类与快捷方式添加前缀，例如 `u-`。
   * @default undefined
   */
  prefix?: string
  /**
   * 边框工具类可用的额外颜色 token，补充 theme.colors。
   * @default undefined
   */
  borderColors?: Record<string, unknown>
}
```

## prefix

```ts
presetUnocss({ prefix: 'u-' })
```

设置后，工具类与快捷方式需要使用前缀：

```html
<div class="u-p-6 u-flex-between u-b-t-primary">...</div>
```

变体位于前缀之外：

```html
<button class="hocus:u-cv-auto">按钮</button>
```

## borderColors

如果你的边框颜色 token 是通过自定义 UnoCSS rule 定义的（而不是放在
`theme.colors`），本预设无法读取那些 rule。把 token 传给 `borderColors` 即可让
`b-*` 工具类解析它们：

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

## 与 presetWind4 组合

```ts
export default defineConfig({
  presets: [presetWind4(), presetUnocss()],
})
```

- 预设只依赖 `@unocss/core`
- 字号规则会覆盖 `presetWind4` 的同名 `text-*` 尺寸，因此本预设应放在后面
- 快捷方式展开后的 `flex`、`w-full` 等基础工具类由 `presetWind4` 提供

主题颜色 `primary` 用于部分边框与快捷方式：

```ts
theme: {
  colors: {
    primary: '#3b82f6',
  },
}
```
