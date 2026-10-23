# 示例

本页的示例由 VitePress 直接加载预设生成，下面的样式是真实生效的。

::: warning
实时效果需要在文档站中查看（`pnpm docs:dev`）。直接在 GitHub 预览 Markdown 时不会加载 UnoCSS，HTML 示例不会带样式。
:::

## 配置

```ts
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

## 订单卡片

```html
<div class="max-w-xl mx-auto p-6 bg-gray-50 rounded-xl">
  <div class="flex-between mb-4">
    <div class="text-2md font-semibold">今日概览</div>
    <span class="text-xs text-gray-500">已更新</span>
  </div>

  <div class="grid-equal-cols gap-3">
    <div class="b-t-2-primary bg-white rounded-lg p-3">
      <div class="text-lg font-semibold">128</div>
      <div class="text-xs text-gray-500">订单</div>
    </div>
    <div class="b-t-2-green bg-white rounded-lg p-3">
      <div class="text-lg font-semibold">96%</div>
      <div class="text-xs text-gray-500">完成率</div>
    </div>
  </div>

  <div class="mt-4 b-b-dashed-red p-3 text-sm">有 3 个订单等待处理。</div>

  <button class="mt-4 px-4 py-2 rounded-lg text-sm bg-primary text-white effect-interactive">
    查看详情
  </button>
</div>
```

效果：

<div class="max-w-xl mx-auto p-6 bg-gray-50 rounded-xl">
  <div class="flex-between mb-4">
    <div class="text-2md font-semibold">今日概览</div>
    <span class="text-xs text-gray-500">已更新</span>
  </div>

  <div class="grid-equal-cols gap-3">
    <div class="b-t-2-primary bg-white rounded-lg p-3">
      <div class="text-lg font-semibold">128</div>
      <div class="text-xs text-gray-500">订单</div>
    </div>
    <div class="b-t-2-green bg-white rounded-lg p-3">
      <div class="text-lg font-semibold">96%</div>
      <div class="text-xs text-gray-500">完成率</div>
    </div>
  </div>

  <div class="mt-4 b-b-dashed-red p-3 text-sm">
    有 3 个订单等待处理。
  </div>

  <button class="mt-4 px-4 py-2 rounded-lg text-sm bg-primary text-white effect-interactive">
    查看详情
  </button>
</div>

## 交互与动效

把鼠标移到卡片上，或点击按钮：

<div class="flex flex-wrap gap-3 mt-4">
  <div class="motion-float b-1 rounded p-4 text-sm">motion-float</div>
  <div class="motion-scale b-1 rounded p-4 text-sm">motion-scale</div>
  <div class="motion-fade b-1 rounded p-4 text-sm">motion-fade</div>
  <button class="effect-interactive px-4 py-2 rounded bg-white b-1 text-sm">effect-interactive</button>
  <button class="effect-selected px-4 py-2 rounded text-sm">effect-selected</button>
</div>

<div class="h-24 b-1 rounded overflow-hidden mt-4">
  <div class="full-flex bg-primary/10 p-2 text-xs">full-flex 撑满容器</div>
</div>

<div class="relative h-24 b-1 rounded mt-2">
  <div class="absolute-center bg-primary text-white px-2 py-1 rounded text-xs">absolute-center</div>
</div>

## 用到的能力

| 类名                    | 来源                                  |
| ----------------------- | ------------------------------------- |
| `flex-between`          | 布局快捷方式                          |
| `grid-equal-cols`       | 布局快捷方式                          |
| `b-t-2-primary`         | 边框规则                              |
| `b-b-dashed-red`        | 边框规则（样式 + 颜色）               |
| `text-2md` / `text-xs`  | 字号规则（覆盖 `presetWind4` 默认值） |
| `effect-interactive`    | 通用交互反馈快捷方式                  |
| `max-w-xl` / `bg-white` | 来自 `presetWind4`                    |

::: tip
示例中的 `primary` / `green` 颜色来自 UnoCSS 主题，使用前请在 `theme.colors` 中定义。
:::
