import type { Rule } from '@unocss/core'

type BorderDirection = 't' | 'r' | 'b' | 'l' | 'x' | 'y'

const borderDirections: Record<BorderDirection, string[]> = {
  t: ['top'],
  r: ['right'],
  b: ['bottom'],
  l: ['left'],
  x: ['left', 'right'],
  y: ['top', 'bottom'],
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

function toPercentage(value: string): string | undefined {
  const raw = value.startsWith('[') && value.endsWith(']') ? value.slice(1, -1) : value
  if (/^\d+(?:\.\d+)?%$/.test(raw)) return raw

  const number = Number(raw)
  if (!Number.isFinite(number)) return

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
  const slash = input.lastIndexOf('/')
  const withOpacity = slash > 0
  const raw = withOpacity ? input.slice(0, slash) : input
  const opacity = withOpacity ? input.slice(slash + 1) : undefined

  const resolved =
    raw.startsWith('[') && raw.endsWith(']')
      ? raw.slice(1, -1)
      : (lookupColor(colors, raw.split('-')) ??
        (/^[a-z]+$/i.test(raw) || isColorFunction(raw) ? raw : undefined))

  if (!resolved) return
  if (!opacity) return resolved

  const percent = toPercentage(opacity)
  if (!percent) return

  return `color-mix(in srgb, ${resolved} ${percent}, transparent)`
}

/**
 * 边框规则,格式为: b-边框方向-边框样式(不写默认为solid)+边框长度(不写默认为1)+边框颜色, 例子:
 *
 * @examples
 *
 * b-t-primary         → border-top: 1px solid primary
 * b-t-dashed-primary  → border-top: 1px dashed primary
 * b-b-dashed-2-red    → border-bottom: 2px dashed red
 * b-t-primary/50      → border-top: 1px solid color-mix(primary 50%, transparent)
 * b-t-[#fff]          → border-top: 1px solid #fff
 */
export const borderRules: Rule[] = [
  [
    /^b-(t|r|b|l|x|y)-(?:(solid|dashed|dotted|double)-)?(?:(\d+)-)?(.+)$/,
    ([, direction, style, width = '1', color], { theme }) => {
      if (!direction || !color) return

      // Reject unsupported styles, e.g. `b-t-wavy-2-red`, instead of treating
      // the rest of the utility as a color.
      if (!style && /^[a-z]+-\d+-.+$/.test(color)) return

      const properties = borderDirections[direction as BorderDirection]
      if (!properties) return

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
