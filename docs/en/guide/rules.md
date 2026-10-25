# Rules

## Border

Syntax:

```
b-[<direction>][-<style>]-<width>-<color>
```

- Direction: `t` / `r` / `b` / `l` / `x` / `y` / `all`; `all` (or omitting it) applies every direction
- Style: `solid` (default), `dashed`, `dotted`, `double`
- Width: number in `px`, required
- Color: theme color, CSS color or an arbitrary value; must come last

Colors are resolved from the UnoCSS theme and also support opacity and
arbitrary values:

| Syntax             | Output                                           |
| ------------------ | ------------------------------------------------ |
| `b-t-1-blue-500`   | `blue.500` from the theme                        |
| `b-t-1-primary/50` | `color-mix(in srgb, <primary> 50%, transparent)` |
| `b-t-1-[primary]`  | theme color `primary` (brackets are theme-aware) |
| `b-t-1-[#fff]`     | `border-color: #fff`                             |
| `b-t-1-rgb(1,2,3)` | `border-color: rgb(1,2,3)`                       |

| Utility                | Output                                     |
| ---------------------- | ------------------------------------------ |
| `b-1-primary`          | all directions, 1px solid primary          |
| `b-all-1-primary`      | all directions, 1px solid primary          |
| `b-t-1-primary`        | `border-top: 1px solid primary`            |
| `b-t-dashed-1-primary` | `border-top: 1px dashed primary`           |
| `b-b-dashed-2-red`     | `border-bottom: 2px dashed red`            |
| `b-l-2-red`            | `border-left: 2px solid red`               |
| `b-x-dotted-3-primary` | left and right borders, 3px dotted primary |
| `b-y-double-1-gray`    | top and bottom borders, 1px double gray    |

Unsupported styles generate no CSS:

```html
<div class="b-t-wavy-2-red"></div>
```

### Result

<div class="grid gap-3 mt-4 text-sm">
  <div class="b-t-4-primary p-3">b-t-4-primary</div>
  <div class="b-r-dashed-2-red p-3">b-r-dashed-2-red</div>
  <div class="b-b-dotted-3-green p-3">b-b-dotted-3-green</div>
  <div class="b-l-double-4-orange p-3">b-l-double-4-orange</div>
  <div class="b-x-dashed-1-blue p-3">b-x-dashed-1-blue</div>
  <div class="b-y-dotted-2-purple p-3">b-y-dotted-2-purple</div>
</div>

Borders also work with variants. Hover or focus this button:

<button class="hocus:b-t-4-primary hocus:text-primary px-4 py-2 mt-3 rounded b-1 text-sm transition-colors">
  hocus:b-t-4-primary
</button>

## Shadow

Syntax:

```
shadow-[<direction>][-<size>]
```

- Direction: `t` / `r` / `b` / `l` / `all`; defaults to `all`
- Size: `sm` / `md` / `lg` / `xl` / `2xl`; defaults to the base size

| Utility          | Output                                                 |
| ---------------- | ------------------------------------------------------ |
| `shadow-t`       | top shadow with the base size                          |
| `shadow-b-md`    | bottom shadow, `0 4px 6px -1px rgba(0,0,0,.1)`         |
| `shadow-r-xl`    | right shadow, `20px 0 25px -5px rgba(0,0,0,.1)`        |
| `shadow-all-2xl` | shadow on every side, `0 0 50px -12px rgba(0,0,0,.25)` |
| `shadow-md`      | same as `shadow-all-md`, `0 0 6px -1px`                |

## Text size

Text-size rules emit both `font-size` and `line-height`:

| Utility     | `font-size` | `line-height` |
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

These names overlap with `presetWind4`. Register this preset last so the
overrides win:

```ts
presets: [presetWind4(), presetUnocss()]
```

### Result

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

| Utility      | Output                        |
| ------------ | ----------------------------- |
| `cv-auto`    | `content-visibility: auto`    |
| `cv-hidden`  | `content-visibility: hidden`  |
| `cv-visible` | `content-visibility: visible` |

### Result

#### The three values

<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
  <div>
    <div class="b-1 p-3 h-16 bg-gray-50">cv-visible: always rendered</div>
    <div class="mt-1 text-gray-500">Normal</div>
  </div>
  <div>
    <div class="b-1 p-3 h-16 bg-gray-50">
      <span class="cv-hidden">This text is hidden by cv-hidden</span>
    </div>
    <div class="mt-1 text-gray-500">Box stays, content is hidden</div>
  </div>
  <div>
    <div class="cv-auto b-1 p-3 h-16 bg-gray-50 [contain-intrinsic-size:64px]">
      cv-auto: same look, off-screen rendering can be skipped
    </div>
    <div class="mt-1 text-gray-500">Takes effect off-screen</div>
  </div>
</div>

#### Toggle it

Check or uncheck the box to switch `cv-hidden`:

<div class="mt-4 text-sm">
  <input id="cv-toggle-en" type="checkbox" class="peer align-middle" checked>
  <label for="cv-toggle-en" class="cursor-pointer select-none ml-2">Show content</label>
</div>
<div class="peer-checked:cv-hidden b-1 rounded p-3 mt-2 text-sm">
  This content is controlled by the checkbox: visible when checked, hidden by
  cv-hidden when unchecked.
</div>

#### Scroll container

The container below is `12rem` tall and every item uses `cv-auto` plus
`[contain-intrinsic-size:80px]`. Scroll it to see off-screen items skipped:

<div class="h-48 overflow-auto b-1 rounded mt-4 divide-y">
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">Item 1 — scroll me</div>
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">Item 2</div>
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">Item 3</div>
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">Item 4</div>
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">Item 5</div>
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">Item 6</div>
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">Item 7</div>
  <div class="cv-auto [contain-intrinsic-size:80px] p-4 text-sm">Item 8</div>
</div>

::: tip
`cv-auto` does not change how content looks; it reduces rendering cost. Enable
Paint flashing in the DevTools Rendering panel to see off-screen items stop
painting.
:::

## hocus variant

`hocus:` matches both `:hover` and `:focus-visible`:

```html
<button class="hocus:cv-auto">Button</button>
```

### Result

Hover with the mouse or focus it with Tab:

<button class="hocus:bg-primary hocus:text-white px-4 py-2 mt-4 rounded bg-gray-200 text-sm transition-colors">
  Hover / focus me
</button>
