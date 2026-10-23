# 快捷方式

所有快捷方式由预设自动注册。部分快捷方式使用 `primary` 颜色，需在
`theme.colors` 中定义。

## 尺寸

| 快捷方式    | 展开                    |
| ----------- | ----------------------- |
| `full`      | `w-full h-full`         |
| `min-full`  | `min-w-full min-h-full` |
| `max-full`  | `max-w-full max-h-full` |
| `full-flex` | `w-full min-h-0 flex-1` |

### 效果

<div class="grid gap-3 mt-4 text-xs">
  <div class="h-20 w-full b-1 rounded overflow-hidden">
    <div class="full bg-primary/10 p-2">full — w-full h-full</div>
  </div>
  <div class="h-20 w-full b-1 rounded overflow-hidden">
    <div class="min-full bg-primary/10 p-2">min-full — 至少撑满容器</div>
  </div>
  <div class="h-20 w-64 b-1 rounded overflow-hidden">
    <div class="max-full w-40 h-10 bg-primary/10 p-2">max-full — 受最大尺寸限制</div>
  </div>
  <div class="h-20 flex gap-2 b-1 rounded p-2">
    <div class="w-10 bg-gray-200 rounded"></div>
    <div class="full-flex bg-primary/10 rounded p-1">full-flex — 占据剩余空间</div>
  </div>
</div>

## 元素

| 快捷方式       | 说明                                                                        |
| -------------- | --------------------------------------------------------------------------- |
| `button`       | 居中排版的按钮重置，移除背景、边框、轮廓并禁用选择                          |
| `reset-button` | 最小化重置，不改变布局                                                      |
| `block-button` | 块级全宽按钮                                                                |
| `link`         | 主色链接，悬浮时显示下划线                                                  |
| `img-cover`    | 图片填满容器，可能裁切                                                      |
| `img-contain`  | 图片完整显示，可能留白                                                      |
| `avatar`       | 圆形头像，浅灰占位背景，禁止压缩                                            |
| `clickable`    | 指针光标，且禁止选中文本                                                    |
| `overlay`      | 绝对定位铺满父容器的半透明遮罩（`black/30`），带背景模糊和 200ms 透明度过渡 |
| `overlay-full` | 固定定位铺满视口的半透明遮罩，适合弹窗/抽屉背景，带 200ms 透明度过渡        |

`button` 不设置内边距与尺寸，可按需追加 `px-4 py-2` 等工具类。
`link` 依赖 `primary` 颜色；`img-cover` / `img-contain` 需要父容器有明确尺寸。

### 效果

按钮：

<div class="flex flex-wrap gap-3 mt-4">
  <button class="button px-4 py-2 b-1 rounded text-sm">button</button>
  <button class="reset-button px-4 py-2 bg-gray-100 text-sm">reset-button</button>
  <button class="block-button p-2 bg-primary text-white text-sm">block-button</button>
</div>

链接、头像与可点击：

<div class="flex flex-wrap gap-4 mt-3 items-center text-sm">
  <a class="link" href="/guide/options">link</a>
  <span class="avatar size-10"></span>
  <span class="clickable px-3 py-1 b-1 rounded">clickable</span>
</div>

图片填充方式：

<div class="grid grid-cols-2 gap-3 mt-3 text-xs">
  <div>
    <div class="h-24 w-full b-1 rounded overflow-hidden">
      <img class="img-cover" alt="img-cover" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='100'%3E%3Crect width='160' height='100' fill='%233b82f6'/%3E%3Ccircle cx='40' cy='40' r='24' fill='%23fff' opacity='.7'/%3E%3C/svg%3E">
    </div>
    <div class="mt-1">img-cover</div>
  </div>
  <div>
    <div class="h-24 w-24 b-1 rounded overflow-hidden bg-gray-100">
      <img class="img-contain" alt="img-contain" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='100'%3E%3Crect width='160' height='100' fill='%233b82f6'/%3E%3Ccircle cx='40' cy='40' r='24' fill='%23fff' opacity='.7'/%3E%3C/svg%3E">
    </div>
    <div class="mt-1">img-contain</div>
  </div>
</div>

遮罩（`overlay` 铺满父容器，下面的文字会被压暗并模糊；上层文字需要高于 `z-50`）：

<div class="relative h-32 rounded overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 mt-3">
  <div class="p-3 text-white">
    <div class="text-sm font-semibold">背景内容</div>
    <div class="text-xs opacity-80">overlay 会压暗并模糊这里</div>
  </div>
  <div class="overlay"></div>
  <span class="absolute bottom-2 left-2 z-60 text-xs text-white">overlay</span>
</div>

固定遮罩（`overlay-full` 铺满视口；这里放在带 `transform` 的容器内，方便预览）：

<div class="relative h-32 rounded overflow-hidden bg-gradient-to-br from-emerald-500 to-cyan-500 mt-3 [transform:translateZ(0)]">
  <div class="p-3 text-white">
    <div class="text-sm font-semibold">视口遮罩</div>
    <div class="text-xs opacity-80">实际使用时 fixed 会覆盖整个视口</div>
  </div>
  <div class="overlay-full"></div>
  <span class="absolute bottom-2 left-2 z-60 text-xs text-white">overlay-full</span>
</div>

### 交互演示

点击按钮添加 `overlay-full` 覆盖整个视口；点击「退出」、遮罩空白处或按 Esc 关闭：

<OverlayDemo />

## 布局

### Flex

| 快捷方式              | 展开                                |
| --------------------- | ----------------------------------- |
| `flex-center`         | `flex justify-center items-center`  |
| `flex-x-center`       | `flex justify-center`               |
| `flex-y-center`       | `flex items-center`                 |
| `flex-between`        | `flex justify-between`              |
| `flex-between-center` | `flex justify-between items-center` |
| `flex-center-between` | `flex justify-center items-stretch` |

### 效果

<div class="grid gap-2 mt-4 text-xs">
  <div class="flex-center gap-2 h-14 b-1 rounded"><span class="px-2 py-1 bg-primary/10 rounded">flex-center</span></div>
  <div class="flex-x-center gap-2 h-14 b-1 rounded"><span class="px-2 py-1 bg-primary/10 rounded">flex-x-center</span></div>
  <div class="flex-y-center gap-2 h-14 b-1 rounded"><span class="px-2 py-1 bg-primary/10 rounded">flex-y-center</span><span class="px-2 py-1 bg-primary/10 rounded self-start">顶部对齐</span></div>
  <div class="flex-between h-14 b-1 rounded p-2"><span class="px-2 py-1 bg-primary/10 rounded">flex-between</span><span class="px-2 py-1 bg-primary/10 rounded">右侧</span></div>
  <div class="flex-between-center h-14 b-1 rounded p-2"><span class="px-2 py-1 bg-primary/10 rounded">flex-between-center</span><span class="px-2 py-1 bg-primary/10 rounded">右侧</span></div>
  <div class="flex-center-between h-14 b-1 rounded p-2"><span class="px-2 py-1 bg-primary/10 rounded">flex-center-between</span><span class="px-2 py-1 bg-primary/10 rounded">stretch</span></div>
</div>

### Grid

| 快捷方式              | 展开                                              |
| --------------------- | ------------------------------------------------- |
| `grid-center`         | `grid place-content-center`                       |
| `grid-x-center`       | `grid justify-center`                             |
| `grid-y-center`       | `grid items-center`                               |
| `grid-stretch`        | `grid items-stretch`                              |
| `grid-between`        | `grid justify-between`                            |
| `grid-between-center` | `grid justify-between items-center`               |
| `grid-center-between` | `grid place-content-between`                      |
| `grid-equal-cols`     | `grid grid-cols-[repeat(auto-fit,minmax(0,1fr))]` |

### 效果

<div class="grid gap-2 mt-4 text-xs">
  <div class="grid-center grid-flow-col gap-1 h-16 b-1 rounded"><span class="px-2 bg-primary/10 rounded">1</span><span class="px-2 bg-primary/10 rounded">2</span></div>
  <div class="grid-x-center grid-flow-col gap-1 h-16 b-1 rounded"><span class="px-2 bg-primary/10 rounded">1</span><span class="px-2 bg-primary/10 rounded">2</span></div>
  <div class="grid-y-center grid-flow-col gap-1 h-16 b-1 rounded"><span class="px-2 bg-primary/10 rounded">1</span><span class="px-2 bg-primary/10 rounded">2</span></div>
  <div class="grid-stretch grid-flow-col gap-1 h-16 b-1 rounded"><span class="bg-primary/10">1</span><span class="bg-primary/10">2</span></div>
  <div class="grid-between grid-flow-col gap-1 h-16 b-1 rounded p-2"><span class="px-2 bg-primary/10 rounded">1</span><span class="px-2 bg-primary/10 rounded">2</span><span class="px-2 bg-primary/10 rounded">3</span></div>
  <div class="grid-between-center grid-flow-col gap-1 h-16 b-1 rounded p-2"><span class="px-2 bg-primary/10 rounded">1</span><span class="px-2 bg-primary/10 rounded">2</span><span class="px-2 bg-primary/10 rounded">3</span></div>
  <div class="grid-center-between grid-flow-col gap-1 h-16 b-1 rounded p-2"><span class="px-2 bg-primary/10 rounded">1</span><span class="px-2 bg-primary/10 rounded">2</span><span class="px-2 bg-primary/10 rounded">3</span></div>
  <div class="grid-equal-cols gap-1"><div class="b-1 p-2 text-center">1</div><div class="b-1 p-2 text-center">2</div><div class="b-1 p-2 text-center">3</div></div>
</div>

### 定位居中

| 快捷方式            | 展开                   |
| ------------------- | ---------------------- |
| `absolute-center`   | 绝对定位，水平垂直居中 |
| `absolute-x-center` | 绝对定位，水平居中     |
| `absolute-y-center` | 绝对定位，垂直居中     |
| `fixed-center`      | 固定定位，水平垂直居中 |
| `fixed-x-center`    | 固定定位，水平居中     |
| `fixed-y-center`    | 固定定位，垂直居中     |

### 效果

<div class="grid sm:grid-cols-2 gap-2 mt-4 text-xs">
  <div class="relative h-20 b-1 rounded"><span class="absolute-center bg-primary text-white px-2 py-1 rounded">absolute-center</span></div>
  <div class="relative h-20 b-1 rounded"><span class="absolute-x-center bg-primary text-white px-2 py-1 rounded top-1">absolute-x-center</span></div>
  <div class="relative h-20 b-1 rounded"><span class="absolute-y-center bg-primary text-white px-2 py-1 rounded left-1">absolute-y-center</span></div>
  <div class="relative h-20 b-1 rounded [transform:translateZ(0)] overflow-hidden"><span class="fixed-center bg-primary text-white px-2 py-1 rounded">fixed-center</span></div>
  <div class="relative h-20 b-1 rounded [transform:translateZ(0)] overflow-hidden"><span class="fixed-x-center bg-primary text-white px-2 py-1 rounded top-1">fixed-x-center</span></div>
  <div class="relative h-20 b-1 rounded [transform:translateZ(0)] overflow-hidden"><span class="fixed-y-center bg-primary text-white px-2 py-1 rounded left-1">fixed-y-center</span></div>
</div>

## 动效

| 快捷方式        | 展开                                                          |
| --------------- | ------------------------------------------------------------- |
| `motion-press`  | 300ms 回弹缓动；按下缩放到 `0.96`，`motion-reduce` 时禁用过渡 |
| `motion-float`  | 200ms 回弹缓动；悬浮时上移 `0.25rem`                          |
| `motion-scale`  | 200ms 回弹缓动；悬浮时放大到 `1.02`                           |
| `motion-shrink` | 200ms 回弹缓动；悬浮时缩小到 `0.98`                           |
| `motion-rotate` | 200ms 回弹缓动；悬浮时旋转 `3deg`                             |
| `motion-fade`   | 200ms 回弹缓动；悬浮时透明度变为 `70%`                        |

### 效果

把鼠标移到卡片上；`motion-press` 需要按住：

<div class="flex flex-wrap gap-3 mt-4">
  <button class="motion-press px-4 py-2 rounded bg-primary text-white text-sm">motion-press</button>
  <div class="motion-float b-1 rounded p-4 text-sm">motion-float</div>
  <div class="motion-scale b-1 rounded p-4 text-sm">motion-scale</div>
  <div class="motion-shrink b-1 rounded p-4 text-sm">motion-shrink</div>
  <div class="motion-rotate b-1 rounded p-4 text-sm">motion-rotate</div>
  <div class="motion-fade b-1 rounded p-4 text-sm">motion-fade</div>
</div>

## 交互反馈

| 快捷方式              | 展开                                                    |
| --------------------- | ------------------------------------------------------- |
| `effect-selected`     | `bg-primary/10 text-primary`                            |
| `effect-focus`        | 容器内聚焦时边框与 ring 使用 `primary`，带 200ms 过渡   |
| `effect-interactive`  | 指针 + 悬浮/按下背景反馈，带 200ms 回弹缓动             |
| `effect-outline-ring` | 键盘聚焦时显示 `primary` ring，带 200ms 过渡            |
| `effect-disabled`     | 禁用时 `cursor-not-allowed opacity-50`                  |
| `effect-skeleton`     | `animate-pulse rounded-md bg-gray-200 dark:bg-gray-800` |
| `effect-shadow`       | 悬浮时添加阴影，带 200ms 回弹缓动                       |
| `effect-border`       | 悬浮时边框变为 `primary`，需已有边框                    |
| `effect-highlight`    | 悬浮时背景与边框高亮为 `primary`，需已有边框            |

`effect-selected`、`effect-focus`、`effect-outline-ring`、`effect-border`、
`effect-highlight` 依赖 `primary` 颜色。

### 效果

<div class="flex flex-wrap gap-3 mt-4 items-center">
  <button class="effect-interactive px-4 py-2 rounded bg-white b-1 text-sm">effect-interactive</button>
  <button class="effect-selected px-4 py-2 rounded text-sm">effect-selected</button>
  <div class="effect-focus b-1 rounded p-2">
    <input class="w-32 bg-transparent text-sm outline-none" placeholder="focus me">
  </div>
  <button class="effect-outline-ring px-4 py-2 rounded bg-primary text-white text-sm">effect-outline-ring（Tab）</button>
  <button class="effect-disabled px-4 py-2 rounded bg-white b-1 text-sm" disabled>effect-disabled</button>
  <div class="effect-shadow px-4 py-2 rounded bg-white b-1 text-sm">effect-shadow</div>
  <div class="effect-border px-4 py-2 rounded b-1 border-solid border-gray-200 text-sm">effect-border</div>
  <div class="effect-highlight px-4 py-2 rounded b-1 border-solid border-gray-200 text-sm">effect-highlight</div>
</div>

<div class="flex gap-2 mt-3">
  <div class="effect-skeleton h-12 w-24"></div>
  <div class="effect-skeleton h-12 w-24"></div>
  <div class="effect-skeleton h-12 w-24"></div>
</div>
