# Shortcuts

All shortcuts are registered by the preset. Some use the `primary` color, so
define it in `theme.colors`.

## Size

| Shortcut    | Expansion               |
| ----------- | ----------------------- |
| `full`      | `w-full h-full`         |
| `min-full`  | `min-w-full min-h-full` |
| `max-full`  | `max-w-full max-h-full` |
| `full-flex` | `w-full min-h-0 flex-1` |

### Result

<div class="grid gap-3 mt-4 text-xs">
  <div class="h-20 w-full b-1 rounded overflow-hidden">
    <div class="full bg-primary/10 p-2">full — w-full h-full</div>
  </div>
  <div class="h-20 w-full b-1 rounded overflow-hidden">
    <div class="min-full bg-primary/10 p-2">min-full — at least the container size</div>
  </div>
  <div class="h-20 w-64 b-1 rounded overflow-hidden">
    <div class="max-full w-40 h-10 bg-primary/10 p-2">max-full — capped by the maximum size</div>
  </div>
  <div class="h-20 flex gap-2 b-1 rounded p-2">
    <div class="w-10 bg-gray-200 rounded"></div>
    <div class="full-flex bg-primary/10 rounded p-1">full-flex — takes the remaining space</div>
  </div>
</div>

## Element

| Shortcut       | Description                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------- |
| `button`       | Centered button reset; removes background, border and outline, disables selection                   |
| `reset-button` | Minimal reset without changing layout                                                               |
| `block-button` | Full-width block button                                                                             |
| `link`         | Primary-colored link with underline on hover                                                        |
| `img-cover`    | Image fills the container, may crop                                                                 |
| `img-contain`  | Image fits inside the container, may letterbox                                                      |
| `avatar`       | Round avatar with a light gray placeholder background                                               |
| `clickable`    | Pointer cursor with text selection disabled                                                         |
| `overlay`      | Absolute `black/30` overlay filling the parent, with blur and a 200ms opacity transition            |
| `overlay-full` | Fixed `black/30` overlay covering the viewport, for modals/drawers, with a 200ms opacity transition |

`button` does not set padding or size; add utilities such as `px-4 py-2` as needed.
`link` requires the `primary` color; `img-cover` / `img-contain` need a sized parent.

### Result

Buttons:

<div class="flex flex-wrap gap-3 mt-4">
  <button class="button px-4 py-2 b-1 rounded text-sm">button</button>
  <button class="reset-button px-4 py-2 bg-gray-100 text-sm">reset-button</button>
  <button class="block-button p-2 bg-primary text-white text-sm">block-button</button>
</div>

Link, avatar and clickable:

<div class="flex flex-wrap gap-4 mt-3 items-center text-sm">
  <a class="link" href="/en/guide/options">link</a>
  <span class="avatar size-10"></span>
  <span class="clickable px-3 py-1 b-1 rounded">clickable</span>
</div>

Image fitting:

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

Overlay (`overlay` fills the parent; content behind is dimmed and blurred, while
the label needs a `z-index` above `z-50`):

<div class="relative h-32 rounded overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 mt-3">
  <div class="p-3 text-white">
    <div class="text-sm font-semibold">Background content</div>
    <div class="text-xs opacity-80">overlay dims and blurs this area</div>
  </div>
  <div class="overlay"></div>
  <span class="absolute bottom-2 left-2 z-60 text-xs text-white">overlay</span>
</div>

Fixed overlay (`overlay-full` covers the viewport; shown inside a transformed
container for preview):

<div class="relative h-32 rounded overflow-hidden bg-gradient-to-br from-emerald-500 to-cyan-500 mt-3 [transform:translateZ(0)]">
  <div class="p-3 text-white">
    <div class="text-sm font-semibold">Viewport overlay</div>
    <div class="text-xs opacity-80">In real use, fixed covers the whole viewport</div>
  </div>
  <div class="overlay-full"></div>
  <span class="absolute bottom-2 left-2 z-60 text-xs text-white">overlay-full</span>
</div>

### Interactive demo

Click the button to add `overlay-full` across the viewport; close it with the
exit button, by clicking the backdrop, or with Esc:

<OverlayDemo
  open-text="Open full-screen overlay"
  description=" covers the whole viewport."
  close-text="Exit"
/>

## Layout

### Flex

#### Centering and main axis

| Shortcut        | Expansion                          |
| --------------- | ---------------------------------- |
| `flex-center`   | `flex justify-center items-center` |
| `flex-x-center` | `flex justify-center`              |
| `flex-y-center` | `flex items-center`                |
| `flex-start`    | `flex justify-start`               |
| `flex-end`      | `flex justify-end`                 |
| `flex-between`  | `flex justify-between`             |
| `flex-around`   | `flex justify-around`              |
| `flex-evenly`   | `flex justify-evenly`              |

#### Result

<div class="grid gap-2 mt-4 text-xs">
  <div class="flex-center h-12 b-1 rounded"><span class="px-2 py-1 bg-primary/10 rounded">flex-center</span></div>
  <div class="flex-between h-12 b-1 rounded p-2"><span class="px-2 py-1 bg-primary/10 rounded">flex-between</span><span class="px-2 py-1 bg-primary/10 rounded">Right</span></div>
  <div class="flex-around h-12 b-1 rounded p-2"><span class="px-2 py-1 bg-primary/10 rounded">1</span><span class="px-2 py-1 bg-primary/10 rounded">2</span><span class="px-2 py-1 bg-primary/10 rounded">3</span></div>
  <div class="flex-evenly h-12 b-1 rounded p-2"><span class="px-2 py-1 bg-primary/10 rounded">1</span><span class="px-2 py-1 bg-primary/10 rounded">2</span><span class="px-2 py-1 bg-primary/10 rounded">3</span></div>
</div>

#### Cross axis

| Shortcut              | Expansion             |
| --------------------- | --------------------- |
| `flex-items-start`    | `flex items-start`    |
| `flex-items-end`      | `flex items-end`      |
| `flex-items-center`   | `flex items-center`   |
| `flex-items-baseline` | `flex items-baseline` |
| `flex-items-stretch`  | `flex items-stretch`  |

#### Result

<div class="grid gap-2 mt-4 text-xs">
  <div class="flex-items-start gap-2 h-14 b-1 rounded p-2"><span class="bg-primary/10 px-2 py-1 rounded">start</span><span class="bg-primary/10 px-2 py-3 rounded">start</span></div>
  <div class="flex-items-center gap-2 h-14 b-1 rounded p-2"><span class="bg-primary/10 px-2 py-1 rounded">center</span><span class="bg-primary/10 px-2 py-3 rounded">center</span></div>
  <div class="flex-items-baseline gap-2 h-14 b-1 rounded p-2"><span class="bg-primary/10 px-2 py-1 rounded text-lg">baseline</span><span class="bg-primary/10 px-2 py-1 rounded">baseline</span></div>
</div>

#### Combined alignment

| Shortcut              | Expansion                           |
| --------------------- | ----------------------------------- |
| `flex-between-center` | `flex justify-between items-center` |
| `flex-start-center`   | `flex justify-start items-center`   |
| `flex-end-center`     | `flex justify-end items-center`     |
| `flex-center-start`   | `flex justify-center items-start`   |
| `flex-center-end`     | `flex justify-center items-end`     |
| `flex-center-stretch` | `flex justify-center items-stretch` |

#### Result

<div class="grid gap-2 mt-4 text-xs">
  <div class="flex-between-center h-14 b-1 rounded p-2"><span class="bg-primary/10 px-2 py-1 rounded">between-center</span><span class="bg-primary/10 px-2 py-1 rounded">Right</span></div>
  <div class="flex-start-center gap-2 h-14 b-1 rounded p-2"><span class="bg-primary/10 px-2 py-1 rounded">start-center</span><span class="bg-primary/10 px-2 py-1 rounded">2</span></div>
  <div class="flex-center-end h-14 b-1 rounded p-2"><span class="bg-primary/10 px-2 py-1 rounded">center-end</span></div>
</div>

#### Column layout

| Shortcut                  | Expansion                                    |
| ------------------------- | -------------------------------------------- |
| `flex-col-center`         | `flex flex-col items-center`                 |
| `flex-col-start`          | `flex flex-col items-start`                  |
| `flex-col-end`            | `flex flex-col items-end`                    |
| `flex-col-between`        | `flex flex-col justify-between`              |
| `flex-col-between-center` | `flex flex-col justify-between items-center` |
| `flex-col-center-center`  | `flex flex-col justify-center items-center`  |

#### Result

<div class="grid grid-cols-3 gap-2 mt-4 text-xs">
  <div class="flex-col-center h-24 b-1 rounded p-2"><span class="bg-primary/10 px-2 py-1 rounded">center</span></div>
  <div class="flex-col-between h-24 b-1 rounded p-2"><span class="bg-primary/10 px-2 py-1 rounded">1</span><span class="bg-primary/10 px-2 py-1 rounded">2</span></div>
  <div class="flex-col-start h-24 b-1 rounded p-2"><span class="bg-primary/10 px-2 py-1 rounded">start</span></div>
</div>

### Grid

#### Container alignment

| Shortcut              | Expansion                                         |
| --------------------- | ------------------------------------------------- |
| `grid-center`         | `grid place-content-center`                       |
| `grid-x-center`       | `grid justify-center`                             |
| `grid-y-center`       | `grid items-center`                               |
| `grid-stretch`        | `grid items-stretch`                              |
| `grid-between`        | `grid justify-between`                            |
| `grid-between-center` | `grid justify-between items-center`               |
| `grid-center-between` | `grid place-content-between`                      |
| `grid-equal-cols`     | `grid grid-cols-[repeat(auto-fit,minmax(0,1fr))]` |

#### Result

<div class="grid gap-2 mt-4 text-xs">
  <div class="grid-center h-20 b-1 rounded"><span class="bg-primary/10 px-2 py-1 rounded">grid-center</span></div>
  <div class="grid-between grid-flow-col h-16 b-1 rounded p-2"><span class="bg-primary/10 px-2 py-1 rounded">1</span><span class="bg-primary/10 px-2 py-1 rounded">2</span><span class="bg-primary/10 px-2 py-1 rounded">3</span></div>
  <div class="grid-equal-cols gap-2"><span class="b-1 p-2 text-center">equal</span><span class="b-1 p-2 text-center">equal</span><span class="b-1 p-2 text-center">equal</span></div>
</div>

#### Item alignment

| Shortcut            | Expansion                 |
| ------------------- | ------------------------- |
| `grid-items-center` | `grid place-items-center` |
| `grid-items-start`  | `grid place-items-start`  |
| `grid-items-end`    | `grid place-items-end`    |

#### Result

<div class="grid gap-2 mt-4 text-xs">
  <div class="grid-items-start grid-3-cols h-20 b-1 rounded gap-2 p-2"><span class="bg-primary/10 px-2 py-1 rounded">start</span><span class="bg-primary/10 px-2 py-1 rounded">start</span><span class="bg-primary/10 px-2 py-1 rounded">start</span></div>
  <div class="grid-items-center grid-3-cols h-20 b-1 rounded gap-2 p-2"><span class="bg-primary/10 px-2 py-1 rounded">center</span><span class="bg-primary/10 px-2 py-1 rounded">center</span><span class="bg-primary/10 px-2 py-1 rounded">center</span></div>
  <div class="grid-items-end grid-3-cols h-20 b-1 rounded gap-2 p-2"><span class="bg-primary/10 px-2 py-1 rounded">end</span><span class="bg-primary/10 px-2 py-1 rounded">end</span><span class="bg-primary/10 px-2 py-1 rounded">end</span></div>
</div>

#### Auto-sizing

| Shortcut           | Expansion                                             |
| ------------------ | ----------------------------------------------------- |
| `grid-auto-cols`   | `grid grid-flow-col auto-cols-fr`                     |
| `grid-auto-rows`   | `grid grid-flow-row auto-rows-fr`                     |
| `grid-cols-fit-sm` | `grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]` |
| `grid-cols-fit-md` | `grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]` |
| `grid-cols-fit-lg` | `grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]` |

#### Result

<div class="grid gap-2 mt-4 text-xs">
  <div class="grid-cols-fit-sm gap-2"><span class="b-1 p-2">fit-sm</span><span class="b-1 p-2">fit-sm</span></div>
  <div class="grid-cols-fit-md gap-2"><span class="b-1 p-2">fit-md</span><span class="b-1 p-2">fit-md</span></div>
  <div class="grid-cols-fit-lg gap-2"><span class="b-1 p-2">fit-lg</span><span class="b-1 p-2">fit-lg</span></div>
  <div class="grid-auto-cols gap-2 h-16"><span class="bg-primary/10 p-2 rounded">auto-cols</span><span class="bg-primary/10 p-2 rounded">auto-cols</span></div>
</div>

#### Fixed columns

| Shortcut      | Expansion          |
| ------------- | ------------------ |
| `grid-2-cols` | `grid grid-cols-2` |
| `grid-3-cols` | `grid grid-cols-3` |
| `grid-4-cols` | `grid grid-cols-4` |
| `grid-full`   | `grid grid-cols-1` |

#### Result

<div class="grid gap-2 mt-4 text-xs">
  <div class="grid-2-cols gap-2"><span class="b-1 p-2 text-center">1</span><span class="b-1 p-2 text-center">2</span></div>
  <div class="grid-3-cols gap-2"><span class="b-1 p-2 text-center">1</span><span class="b-1 p-2 text-center">2</span><span class="b-1 p-2 text-center">3</span></div>
  <div class="grid-4-cols gap-2"><span class="b-1 p-2 text-center">1</span><span class="b-1 p-2 text-center">2</span><span class="b-1 p-2 text-center">3</span><span class="b-1 p-2 text-center">4</span></div>
</div>

### Position

#### Centering

| Shortcut            | Expansion                       |
| ------------------- | ------------------------------- |
| `absolute-center`   | absolute, centered on both axes |
| `absolute-x-center` | absolute, horizontally centered |
| `absolute-y-center` | absolute, vertically centered   |
| `fixed-center`      | fixed, centered on both axes    |
| `fixed-x-center`    | fixed, horizontally centered    |
| `fixed-y-center`    | fixed, vertically centered      |

#### Result

<div class="grid sm:grid-cols-2 gap-2 mt-4 text-xs">
  <div class="relative h-24 b-1 rounded"><span class="absolute-center bg-primary text-white px-2 py-1 rounded">absolute-center</span></div>
  <div class="relative h-24 b-1 rounded"><span class="absolute-x-center bg-primary text-white px-2 py-1 rounded top-1">absolute-x-center</span></div>
  <div class="relative h-24 b-1 rounded"><span class="absolute-y-center bg-primary text-white px-2 py-1 rounded left-1">absolute-y-center</span></div>
  <div class="relative h-24 b-1 rounded overflow-hidden [transform:translateZ(0)]"><span class="fixed-center bg-primary text-white px-2 py-1 rounded">fixed-center</span></div>
</div>

#### Corners

| Shortcut                | Expansion                   |
| ----------------------- | --------------------------- |
| `absolute-top-left`     | `absolute top-0 left-0`     |
| `absolute-top-right`    | `absolute top-0 right-0`    |
| `absolute-bottom-left`  | `absolute bottom-0 left-0`  |
| `absolute-bottom-right` | `absolute bottom-0 right-0` |
| `fixed-top-left`        | `fixed top-0 left-0`        |
| `fixed-top-right`       | `fixed top-0 right-0`       |
| `fixed-bottom-left`     | `fixed bottom-0 left-0`     |
| `fixed-bottom-right`    | `fixed bottom-0 right-0`    |

#### Result

<div class="relative h-24 b-1 rounded mt-4 text-xs">
  <span class="absolute-top-left bg-primary text-white px-2 py-1 rounded">TL</span>
  <span class="absolute-top-right bg-primary text-white px-2 py-1 rounded">TR</span>
  <span class="absolute-bottom-left bg-primary text-white px-2 py-1 rounded">BL</span>
  <span class="absolute-bottom-right bg-primary text-white px-2 py-1 rounded">BR</span>
</div>

#### Edge centering

| Shortcut                 | Expansion                                     |
| ------------------------ | --------------------------------------------- |
| `absolute-top-center`    | `absolute top-0 left-1/2 -translate-x-1/2`    |
| `absolute-bottom-center` | `absolute bottom-0 left-1/2 -translate-x-1/2` |
| `absolute-left-center`   | `absolute left-0 top-1/2 -translate-y-1/2`    |
| `absolute-right-center`  | `absolute right-0 top-1/2 -translate-y-1/2`   |
| `fixed-top-center`       | `fixed top-0 left-1/2 -translate-x-1/2`       |
| `fixed-bottom-center`    | `fixed bottom-0 left-1/2 -translate-x-1/2`    |
| `fixed-left-center`      | `fixed left-0 top-1/2 -translate-y-1/2`       |
| `fixed-right-center`     | `fixed right-0 top-1/2 -translate-y-1/2`      |

#### Result

<div class="relative h-24 b-1 rounded mt-4 text-xs">
  <span class="absolute-top-center bg-primary text-white px-2 py-1 rounded">TC</span>
  <span class="absolute-bottom-center bg-primary text-white px-2 py-1 rounded">BC</span>
  <span class="absolute-left-center bg-primary text-white px-2 py-1 rounded">LC</span>
  <span class="absolute-right-center bg-primary text-white px-2 py-1 rounded">RC</span>
</div>

#### Filling

| Shortcut        | Expansion          |
| --------------- | ------------------ |
| `absolute-fill` | `absolute inset-0` |
| `fixed-fill`    | `fixed inset-0`    |

#### Result

<div class="grid sm:grid-cols-2 gap-2 mt-4 text-xs">
  <div class="relative h-24 b-1 rounded overflow-hidden">
    <div class="absolute-fill bg-primary/20 flex-center text-primary">absolute-fill</div>
  </div>
  <div class="relative h-24 b-1 rounded overflow-hidden [transform:translateZ(0)]">
    <div class="fixed-fill bg-primary/20 flex-center text-primary">fixed-fill</div>
  </div>
</div>

## Motion

| Shortcut        | Expansion                                                                       |
| --------------- | ------------------------------------------------------------------------------- |
| `motion-press`  | 300ms springy easing; scales to `0.96` on press, disabled under `motion-reduce` |
| `motion-float`  | 200ms springy easing; moves up `0.25rem` on hover                               |
| `motion-scale`  | 200ms springy easing; scales to `1.02` on hover                                 |
| `motion-shrink` | 200ms springy easing; scales to `0.98` on hover                                 |
| `motion-rotate` | 200ms springy easing; rotates `3deg` on hover                                   |
| `motion-fade`   | 200ms springy easing; opacity `70%` on hover                                    |

### Result

Hover the cards; press and hold `motion-press`:

<div class="flex flex-wrap gap-3 mt-4">
  <button class="motion-press px-4 py-2 rounded bg-primary text-white text-sm">motion-press</button>
  <div class="motion-float b-1 rounded p-4 text-sm">motion-float</div>
  <div class="motion-scale b-1 rounded p-4 text-sm">motion-scale</div>
  <div class="motion-shrink b-1 rounded p-4 text-sm">motion-shrink</div>
  <div class="motion-rotate b-1 rounded p-4 text-sm">motion-rotate</div>
  <div class="motion-fade b-1 rounded p-4 text-sm">motion-fade</div>
</div>

## Interaction effects

| Shortcut              | Expansion                                                                          |
| --------------------- | ---------------------------------------------------------------------------------- |
| `effect-selected`     | `bg-primary/10 text-primary`                                                       |
| `effect-focus`        | `primary` border and ring when a child is focused, with a 200ms transition         |
| `effect-interactive`  | Pointer cursor plus hover/press background feedback, 200ms ease-out                |
| `effect-outline-ring` | `primary` ring on keyboard focus with a 200ms transition                           |
| `effect-disabled`     | `cursor-not-allowed opacity-50` when disabled                                      |
| `effect-skeleton`     | `animate-pulse rounded-md bg-gray-200 dark:bg-gray-800`                            |
| `effect-shadow`       | Adds a shadow on hover with 200ms ease-out                                         |
| `effect-border`       | Border turns `primary` on hover; requires an existing border                       |
| `effect-highlight`    | Background and border highlight as `primary` on hover; requires an existing border |

`effect-selected`, `effect-focus`, `effect-outline-ring`, `effect-border` and
`effect-highlight` require the `primary` color.

### Result

<div class="flex flex-wrap gap-3 mt-4 items-center">
  <button class="effect-interactive px-4 py-2 rounded bg-white b-1 text-sm">effect-interactive</button>
  <button class="effect-selected px-4 py-2 rounded text-sm">effect-selected</button>
  <div class="effect-focus b-1 rounded p-2">
    <input class="w-32 bg-transparent text-sm outline-none" placeholder="focus me">
  </div>
  <button class="effect-outline-ring px-4 py-2 rounded bg-primary text-white text-sm">effect-outline-ring (Tab)</button>
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

## Text

| Shortcut       | Expansion                           |
| -------------- | ----------------------------------- |
| `text-clamp-2` | Clamp to two lines with an ellipsis |
| `text-clamp-3` | Clamp to three lines                |
| `text-clamp-4` | Clamp to four lines                 |
| `text-clamp-5` | Clamp to five lines                 |

### Result

<div class="grid gap-3 mt-4 text-sm">
  <div class="text-clamp-2 w-72 bg-gray-50 b-1 rounded">This is a long paragraph used to demonstrate text clamping. Content beyond the configured number of lines is hidden and replaced with an ellipsis, which fits card titles and list summaries. UnoCSS line-clamp truncates content at the requested number of lines, so each variant should show a clearly different height. The paragraph is intentionally repeated to guarantee that every variant, from text-clamp-2 through text-clamp-5, actually overflows and demonstrates the truncation. This is a long paragraph used to demonstrate text clamping. Content beyond the configured number of lines is hidden and replaced with an ellipsis, which fits card titles and list summaries.</div>
  <div class="text-clamp-3 w-72 bg-gray-50 b-1 rounded">This is a long paragraph used to demonstrate text clamping. Content beyond the configured number of lines is hidden and replaced with an ellipsis, which fits card titles and list summaries. UnoCSS line-clamp truncates content at the requested number of lines, so each variant should show a clearly different height. The paragraph is intentionally repeated to guarantee that every variant, from text-clamp-2 through text-clamp-5, actually overflows and demonstrates the truncation. This is a long paragraph used to demonstrate text clamping. Content beyond the configured number of lines is hidden and replaced with an ellipsis, which fits card titles and list summaries.</div>
  <div class="text-clamp-4 w-72 bg-gray-50 b-1 rounded">This is a long paragraph used to demonstrate text clamping. Content beyond the configured number of lines is hidden and replaced with an ellipsis, which fits card titles and list summaries. UnoCSS line-clamp truncates content at the requested number of lines, so each variant should show a clearly different height. The paragraph is intentionally repeated to guarantee that every variant, from text-clamp-2 through text-clamp-5, actually overflows and demonstrates the truncation. This is a long paragraph used to demonstrate text clamping. Content beyond the configured number of lines is hidden and replaced with an ellipsis, which fits card titles and list summaries.</div>
  <div class="text-clamp-5 w-72 bg-gray-50 b-1 rounded">This is a long paragraph used to demonstrate text clamping. Content beyond the configured number of lines is hidden and replaced with an ellipsis, which fits card titles and list summaries. UnoCSS line-clamp truncates content at the requested number of lines, so each variant should show a clearly different height. The paragraph is intentionally repeated to guarantee that every variant, from text-clamp-2 through text-clamp-5, actually overflows and demonstrates the truncation. This is a long paragraph used to demonstrate text clamping. Content beyond the configured number of lines is hidden and replaced with an ellipsis, which fits card titles and list summaries.</div>
</div>

## Layers

| Shortcut         | Expansion            |
| ---------------- | -------------------- |
| `layer-base`     | `relative z-0`       |
| `layer-dropdown` | `relative z-10`      |
| `layer-sticky`   | `sticky z-20`        |
| `layer-overlay`  | `fixed inset-0 z-30` |
| `layer-modal`    | `fixed inset-0 z-40` |
| `layer-tooltip`  | `fixed z-50`         |

```html
<header class="layer-sticky">...</header>
<aside class="layer-modal">...</aside>
<div class="layer-tooltip">...</div>
```

::: warning
`layer-overlay`, `layer-modal` and `layer-tooltip` use `fixed`; rendering them
here would cover the whole documentation page, so only usage examples are shown.
:::
