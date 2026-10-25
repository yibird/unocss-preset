# 规则

## 边框

格式：

```
b-[<方向>][-<样式>]-<宽度>-<颜色>
```

- 方向：`t` / `r` / `b` / `l` / `x` / `y` / `all`，不写时等同于 `all`，生成所有方向
- 样式：`solid`（默认）、`dashed`、`dotted`、`double`
- 宽度：单位 `px` 的数字，必须写
- 颜色：主题色、CSS 颜色或任意值，必须放在最后

颜色会从 UnoCSS 主题中解析，也支持透明度和任意值：

| 写法               | 输出                                             |
| ------------------ | ------------------------------------------------ |
| `b-t-1-blue-500`   | 主题中 `blue.500` 的颜色                         |
| `b-t-1-primary/50` | `color-mix(in srgb, <primary> 50%, transparent)` |
| `b-t-1-[primary]`  | 主题色 `primary`（括号内同样会解析主题）         |
| `b-t-1-[#fff]`     | `border-color: #fff`                             |
| `b-t-1-rgb(1,2,3)` | `border-color: rgb(1,2,3)`                       |

| 工具类                 | 输出                             |
| ---------------------- | -------------------------------- |
| `b-1-primary`          | 所有方向，1px solid primary      |
| `b-all-1-primary`      | 所有方向，1px solid primary      |
| `b-t-1-primary`        | `border-top: 1px solid primary`  |
| `b-t-dashed-1-primary` | `border-top: 1px dashed primary` |
| `b-b-dashed-2-red`     | `border-bottom: 2px dashed red`  |
| `b-l-2-red`            | `border-left: 2px solid red`     |
| `b-x-dotted-3-primary` | 左右边框，3px dotted primary     |
| `b-y-double-1-gray`    | 上下边框，1px double gray        |

不支持的样式不会生成任何 CSS：

```html
<div class="b-t-wavy-2-red"></div>
```

### 效果

<div class="grid gap-3 mt-4 text-sm">
  <div class="b-t-4-primary p-3">b-t-4-primary</div>
  <div class="b-r-dashed-2-red p-3">b-r-dashed-2-red</div>
  <div class="b-b-dotted-3-green p-3">b-b-dotted-3-green</div>
  <div class="b-l-double-4-orange p-3">b-l-double-4-orange</div>
  <div class="b-x-dashed-1-blue p-3">b-x-dashed-1-blue</div>
  <div class="b-y-dotted-2-purple p-3">b-y-dotted-2-purple</div>
</div>

边框也可以和变体组合，悬浮或聚焦试试：

<button class="hocus:b-t-4-primary hocus:text-primary px-4 py-2 mt-3 rounded b-1 text-sm transition-colors">
  hocus:b-t-4-primary
</button>

## 阴影

格式：

```
shadow-[<方向>][-<尺寸>]
```

- 方向：`t` / `r` / `b` / `l` / `all`，不写时等同于 `all`
- 尺寸：`sm` / `md` / `lg` / `xl` / `2xl`，不写时使用默认尺寸

| 工具类           | 输出                                        |
| ---------------- | ------------------------------------------- |
| `shadow-t`       | 顶部阴影，默认尺寸                          |
| `shadow-b-md`    | 底部阴影，`0 4px 6px -1px rgba(0,0,0,.1)`   |
| `shadow-r-xl`    | 右侧阴影，`20px 0 25px -5px rgba(0,0,0,.1)` |
| `shadow-all-2xl` | 四周阴影，`0 0 50px -12px rgba(0,0,0,.25)`  |
| `shadow-md`      | 等同于 `shadow-all-md`，四周 `0 0 6px -1px` |

## 字号

字号规则同时输出 `font-size` 与 `line-height`：

| 工具类      | `font-size` | `line-height` |
| ----------- | ----------- | ------------- |
| `text-xs`   | `12px`      | `14px`        |
| `text-sm`   | `14px`      | `18px`        |
| `text-base` | `16px`      | `24px`        |
| `text-md`   | `18px`      | `28px`        |
| `text-2md`  | `20px`      | `32px`        |
| `text-lg`   | `24px`      | `34px`        |
| `text-xl`   | `28px`      | `40px`        |
| `text-2xl`  | `36px`      | `42px`        |
| `text-3xl`  | `48px`      | `56px`        |
| `text-4xl`  | `60px`      | `72px`        |
| `text-5xl`  | `72px`      | `80px`        |

这些名称与 `presetWind4` 重名。为确保覆盖生效，请把本预设放在后面：

```ts
presets: [presetWind4(), presetUnocss()]
```

### 效果

<div class="space-y-1 mt-4">
  <div class="text-xs">text-xs — 12px / 14px</div>
  <div class="text-sm">text-sm — 14px / 18px</div>
  <div class="text-base">text-base — 16px / 24px</div>
  <div class="text-md">text-md — 18px / 28px</div>
  <div class="text-2md">text-2md — 20px / 32px</div>
  <div class="text-lg">text-lg — 24px / 34px</div>
  <div class="text-xl">text-xl — 28px / 40px</div>
  <div class="text-2xl">text-2xl — 36px / 42px</div>
  <div class="text-3xl">text-3xl — 48px / 56px</div>
  <div class="text-4xl">text-4xl — 60px / 72px</div>
  <div class="text-5xl">text-5xl — 72px / 80px</div>
</div>

## content-visibility

| 工具类       | 输出                          |
| ------------ | ----------------------------- |
| `cv-auto`    | `content-visibility: auto`    |
| `cv-hidden`  | `content-visibility: hidden`  |
| `cv-visible` | `content-visibility: visible` |

### 效果

#### 三种取值的区别

<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
  <div>
    <div class="b-1 p-3 h-16 bg-gray-50">cv-visible：始终渲染</div>
    <div class="mt-1 text-gray-500">正常显示</div>
  </div>
  <div>
    <div class="b-1 p-3 h-16 bg-gray-50">
      <span class="cv-hidden">这段文字被 cv-hidden 隐藏了</span>
    </div>
    <div class="mt-1 text-gray-500">盒子还在，内容不可见</div>
  </div>
  <div>
    <div class="cv-auto b-1 p-3 h-16 bg-gray-50 [contain-intrinsic-size:64px]">
      cv-auto：外观不变，视口外可跳过渲染
    </div>
    <div class="mt-1 text-gray-500">滚动到视口外时生效</div>
  </div>
</div>

#### 动态切换

勾选 / 取消复选框，直接切换 `cv-hidden`：

<div class="mt-4 text-sm">
  <input id="cv-toggle" type="checkbox" class="peer align-middle" checked>
  <label for="cv-toggle" class="cursor-pointer select-none ml-2">显示内容</label>
</div>
<div class="peer-checked:cv-hidden b-1 rounded p-3 mt-2 text-sm">
  这段内容由复选框控制：勾选时可见，取消勾选后会被 cv-hidden 隐藏。
</div>

#### 滚动容器

下面的容器高 `12rem`，每个条目都使用 `cv-auto` 和
`[contain-intrinsic-size:80px]`。滚动时可观察视口外条目被跳过渲染：

<div class="h-48 overflow-auto b-1 rounded mt-4 divide-y">
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">条目 1 — 滚动我</div>
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">条目 2</div>
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">条目 3</div>
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">条目 4</div>
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">条目 5</div>
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">条目 6</div>
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">条目 7</div>
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">条目 8</div>
</div>

::: tip
`cv-auto` 不会改变可见样式，它优化的是渲染成本。可在浏览器 DevTools 的
Rendering 面板中开启 Paint flashing 观察视口外的条目不再绘制。
:::

## hocus 变体

`hocus:` 同时匹配 `:hover` 与 `:focus-visible`：

```html
<button class="hocus:cv-auto">按钮</button>
```

### 效果

把鼠标移上去，或用 Tab 键聚焦：

<button class="hocus:bg-primary hocus:text-white px-4 py-2 mt-4 rounded bg-gray-200 text-sm transition-colors">
  悬浮 / 聚焦我
</button>
