import type { Rule } from '@unocss/core'

type BorderDirection = 't' | 'r' | 'b' | 'l' | 'x' | 'y' | 'all'

const borderDirections: Record<BorderDirection, string[]> = {
  t: ['top'],
  r: ['right'],
  b: ['bottom'],
  l: ['left'],
  x: ['left', 'right'],
  y: ['top', 'bottom'],
  all: ['top', 'right', 'bottom', 'left'],
}

/**
 * Resolves a theme color path such as `primary`, `blue-500` or `light-blue-500`.
 * Longer keys win so theme entries containing hyphens still work.
 */
function lookupColor(colors: unknown, parts: string[]): string | undefined {
  if (!colors || typeof colors !== 'object') return
  for (let size = parts.length; size > 0; size--) {
    const key = parts.slice(0, size).join('-')
    if (!(key in colors)) continue
    const value = (colors as Record<string, unknown>)[key]
    if (size === parts.length) {
      if (typeof value === 'string') return value
      continue
    }
    const nested = lookupColor(value, parts.slice(size))
    if (nested) return nested
  }
}

function isColorFunction(value: string): boolean {
  return /^(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|var)\(/i.test(value)
}

const namedColors = new Set(
  `aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue
  blueviolet brown burlywood cadetblue chartreuse chocolate coral cornflowerblue cornsilk
  crimson cyan darkblue darkcyan darkgoldenrod darkgray darkgreen darkgrey darkkhaki
  darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen
  darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue
  dimgray dimgrey dodgerblue firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite
  gold goldenrod gray green greenyellow grey honeydew hotpink indianred indigo ivory khaki
  lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan
  lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen
  lightskyblue lightslategray lightslategrey lightsteelblue lightyellow lime limegreen linen
  magenta maroon mediumaquamarine mediumblue mediumorchid mediumpurple mediumseagreen
  mediumslateblue mediumspringgreen mediumturquoise mediumvioletred midnightblue mintcream
  mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid
  palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum
  powderblue purple rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown
  seagreen seashell sienna silver skyblue slateblue slategray slategrey snow springgreen
  steelblue tan teal thistle tomato transparent turquoise violet wheat white whitesmoke
  yellow yellowgreen currentcolor`.split(/\s+/),
)

/**
 * Splits the opacity modifier from the color at a `/` outside any brackets or
 * parentheses, so arbitrary values such as `[rgb(1_2_3_/_50%)]` stay intact.
 */
function splitOpacity(input: string): [string, string | undefined] {
  let depth = 0
  let slash = -1

  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    if (char === '[' || char === '(') depth++
    else if (char === ']' || char === ')') depth--
    else if (char === '/' && depth === 0) slash = i
  }

  if (slash < 0) return [input, undefined]
  return [input.slice(0, slash), input.slice(slash + 1)]
}

function toPercentage(value: string): string | undefined {
  const raw = value.startsWith('[') && value.endsWith(']') ? value.slice(1, -1) : value
  if (/^(?:\d+(?:\.\d+)?|\.\d+)%$/.test(raw)) return raw
  if (!raw) return

  const number = Number(raw)
  if (!Number.isFinite(number) || number < 0) return

  const percent = raw.includes('.') && number <= 1 ? number * 100 : number
  return `${percent}%`
}

/**
 * Resolves theme colors, opacity modifiers and arbitrary values.
 *
 * - `primary` → theme color
 * - `blue-500` → nested theme color
 * - `primary/50` → `color-mix(...)`
 * - `[#fff]` → `#fff`
 * - `red` / `rgb(1,2,3)` → raw CSS colors
 */
function resolveColor(input: string, colors: unknown): string | undefined {
  const [raw, opacity] = splitOpacity(input)

  let resolved: string | undefined
  if (raw.startsWith('[') && raw.endsWith(']')) {
    const inner = raw.slice(1, -1)
    // Arbitrary values still resolve theme colors, e.g. `[primary]` → `#3b82f6`.
    resolved = lookupColor(colors, inner.split('-')) ?? inner.replaceAll('_', ' ')
  } else {
    resolved =
      lookupColor(colors, raw.split('-')) ??
      (namedColors.has(raw.toLowerCase()) || isColorFunction(raw) ? raw : undefined)
  }

  if (!resolved) return
  if (opacity === undefined) return resolved

  const percent = toPercentage(opacity)
  if (!percent) return

  return `color-mix(in srgb, ${resolved} ${percent}, transparent)`
}

/**
 * 边框规则,格式为: b-边框方向(不写默认生成所有方向)-边框样式(不写默认为solid)-边框长度(必须写)-边框颜色, 例子:
 *
 * @examples
 *
 * b-1-primary          → 所有方向 1px solid primary
 * b-all-1-primary      → 所有方向 1px solid primary
 * b-t-1-primary        → border-top: 1px solid primary
 * b-t-dashed-1-primary → border-top: 1px dashed primary
 * b-b-dashed-2-red     → border-bottom: 2px dashed red
 * b-1-primary/50       → 所有方向 1px solid color-mix(primary 50%, transparent)
 * b-t-1-[#fff]         → border-top: 1px solid #fff
 */
export const borderRules: Rule[] = [
  [
    /^b-(?:(all|[trblxy])-)?(?:(solid|dashed|dotted|double)-)?(\d+)-(.+)$/,
    ([, direction, style, width, color], { theme }) => {
      if (!width || !color) return
      const properties = borderDirections[(direction ?? 'all') as BorderDirection]
      const resolvedColor = resolveColor(color, (theme as { colors?: unknown }).colors)
      if (!resolvedColor) return

      const declarations: Record<string, string> = {}
      for (const s of properties) {
        declarations[`border-${s}-width`] = `${width}px`
        declarations[`border-${s}-style`] = style ?? 'solid'
        declarations[`border-${s}-color`] = resolvedColor
      }
      return declarations
    },
  ],
]
