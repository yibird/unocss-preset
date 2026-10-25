import type { Preset, Variant } from '@unocss/core'
import { definePreset } from '@unocss/core'
import { shortcuts } from './shortcuts'
import { createRules } from './rules'

/**
 * Options accepted by {@link presetUnocss}.
 */
export interface PresetUnocssOptions {
  /**
   * Prefix applied to every generated utility, for example `u-`.
   * @default undefined
   */
  prefix?: string
  /**
   * Extra color tokens used by border utilities, in addition to the theme.
   * Useful when tokens are defined through custom UnoCSS rules instead of
   * `theme.colors`, for example `borderColors: borderColorTokens`.
   * @default undefined
   */
  borderColors?: Record<string, unknown>
}

/**
 * `hocus:` variant matching both `:hover` and `:focus-visible`.
 */
const hocusVariant: Variant = {
  name: 'hocus',
  match: (matcher) => {
    if (!matcher.startsWith('hocus:')) return
    return {
      matcher: matcher.slice('hocus:'.length),
      selector: (selector) => `${selector}:hover, ${selector}:focus-visible`,
    }
  },
}

/**
 *
 * @example
 * ```ts
 * import presetUnocss from '@starweave-lab/unocss-preset'
 *
 * export default defineConfig({
 *   presets: [presetWind4(), presetUnocss()],
 * })
 * ```
 */
export const presetUnocss = definePreset<PresetUnocssOptions>((options = {}) => {
  const { prefix } = options
  const preset: Preset = {
    name: 'unocss-preset',
    rules: createRules(options),
    variants: [hocusVariant],
    shortcuts,
    prefix: prefix,
  }
  return preset
})

export default presetUnocss
