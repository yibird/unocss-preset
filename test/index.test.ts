import { createGenerator } from '@unocss/core'
import presetWind4 from '@unocss/preset-wind4'
import { describe, expect, it } from 'vite-plus/test'
import presetUnocss, { type PresetUnocssOptions } from '../src/index.ts'

async function generate(input: string, options?: PresetUnocssOptions, preflights = false) {
  const uno = await createGenerator({
    // The preset must come last so its text sizes override presetWind4.
    presets: [presetWind4(), presetUnocss(options)],
    theme: {
      colors: {
        primary: '#3b82f6',
      },
    },
  })
  const { css } = await uno.generate(input, { preflights })
  return css
}

describe('border rules', () => {
  it('defaults to a 1px solid border', async () => {
    const css = await generate('b-t-primary')

    expect(css).toContain('border-top-width:1px;')
    expect(css).toContain('border-top-style:solid;')
    expect(css).toContain('border-top-color:#3b82f6;')
  })

  it('supports style, width and color', async () => {
    const css = await generate('b-b-dashed-2-red')

    expect(css).toContain('border-bottom-width:2px;')
    expect(css).toContain('border-bottom-style:dashed;')
    expect(css).toContain('border-bottom-color:red;')
  })

  it('supports style without an explicit width', async () => {
    const css = await generate('b-r-dotted-blue')

    expect(css).toContain('border-right-width:1px;')
    expect(css).toContain('border-right-style:dotted;')
    expect(css).toContain('border-right-color:blue;')
  })

  it('supports width without an explicit style', async () => {
    const css = await generate('b-l-2-red')

    expect(css).toContain('border-left-width:2px;')
    expect(css).toContain('border-left-style:solid;')
    expect(css).toContain('border-left-color:red;')
  })

  it('supports every direction', async () => {
    const css = await generate('b-x-dotted-3-red b-y-double-1-blue')

    expect(css).toContain('border-left-width:3px;')
    expect(css).toContain('border-right-width:3px;')
    expect(css).toContain('border-top-width:1px;')
    expect(css).toContain('border-bottom-width:1px;')
    expect(css).toContain('border-top-style:double;')
  })

  it('ignores unsupported styles', async () => {
    const css = await generate('b-t-wavy-2-red')

    expect(css).not.toContain('border-top')
  })

  it('resolves nested theme colors', async () => {
    const css = await generate('b-t-blue-500')

    expect(css).toContain('border-top-color:')
    expect(css).not.toContain('border-top-color:blue-500;')
  })

  it('supports opacity modifiers', async () => {
    const css = await generate('b-t-primary/50 b-t-red/[0.5]')

    expect(css).toContain('border-top-color:color-mix(in srgb, #3b82f6 50%, transparent);')
    expect(css).toContain('border-top-color:color-mix(in srgb, red 50%, transparent);')
  })

  it('supports arbitrary colors', async () => {
    const css = await generate('b-t-[#fff] b-b-[rgb(1,2,3)]')

    expect(css).toContain('border-top-color:#fff;')
    expect(css).toContain('border-bottom-color:rgb(1,2,3);')
  })
})

describe('text size rules', () => {
  it('generates font-size and line-height', async () => {
    const css = await generate('text-xs text-2md text-4xl')

    expect(css).toContain('font-size:12px;')
    expect(css).toContain('line-height:14px;')
    expect(css).toContain('font-size:20px;')
    expect(css).toContain('line-height:32px;')
    expect(css).toContain('font-size:60px;')
    expect(css).toContain('line-height:72px;')
  })

  it('overrides presetWind4 sizes', async () => {
    const css = await generate('text-xs')

    expect(css).toContain('font-size:12px;')
    expect(css).not.toContain('font-size:0.75rem;')
  })
})

describe('content visibility rules', () => {
  it('generates every value', async () => {
    const css = await generate('cv-auto cv-hidden cv-visible')

    expect(css).toContain('content-visibility:auto;')
    expect(css).toContain('content-visibility:hidden;')
    expect(css).toContain('content-visibility:visible;')
  })
})

describe('hocus variant', () => {
  it('applies hover and focus-visible selectors', async () => {
    const css = await generate('hocus:cv-auto')

    expect(css).toContain(':hover')
    expect(css).toContain(':focus-visible')
    expect(css).toContain('content-visibility:auto;')
  })
})

describe('shortcuts', () => {
  it('expands size shortcuts', async () => {
    const css = await generate('full full-flex')

    expect(css).toContain('width:100%;')
    expect(css).toContain('height:100%;')
    expect(css).toContain('flex:1 1 0%;')
  })

  it('expands layout shortcuts', async () => {
    const css = await generate('flex-center flex-between grid-equal-cols absolute-center')

    expect(css).toContain('display:flex;')
    expect(css).toContain('align-items:center;')
    expect(css).toContain('justify-content:space-between;')
    expect(css).toContain('grid-template-columns:repeat(auto-fit,minmax(0,1fr));')
    expect(css).toContain('position:absolute;')
    expect(css).toContain('--un-translate-x:-50%;')
    expect(css).toContain('--un-translate-y:-50%;')
  })

  it('expands button shortcuts', async () => {
    const css = await generate('button reset-button block-button')

    expect(css).toContain('cursor:pointer;')
    expect(css).toContain('background-color:transparent;')
    expect(css).toContain('border-style:none;')
    expect(css).toContain('width:100%;')
  })

  it('expands link, media and overlay shortcuts', async () => {
    const css = await generate('link avatar img-cover img-contain clickable overlay overlay-full')

    expect(css).toContain('text-decoration-line:underline;')
    expect(css).toContain('border-radius:')
    expect(css).toContain('object-fit:cover;')
    expect(css).toContain('object-fit:contain;')
    expect(css).toContain('user-select:none;')
    expect(css).toContain('position:absolute;')
    expect(css).toContain('position:fixed;')
    expect(css).toContain('z-index:50;')
    expect(css).toContain('transition-property:opacity;')
    expect(css).toContain('transition-duration:200ms;')
  })

  it('expands motion shortcuts', async () => {
    const press = await generate('motion-press')

    expect(press).toContain('transition-property:transform')
    expect(press).toContain('transition-duration:300ms;')
    expect(press).toContain(':active')

    const shrink = await generate('motion-shrink')

    expect(shrink).toContain('transition-duration:200ms;')
    expect(shrink).toContain(':hover')
    expect(shrink).toContain('0.98')
  })

  it('expands effect shortcuts', async () => {
    const css = await generate('effect-interactive effect-shadow effect-disabled')

    expect(css).toContain(':hover')
    expect(css).toContain('gray-100')
    expect(css).toContain('box-shadow:')
    expect(css).toContain(':disabled')
    expect(css).toContain('opacity:')

    const focus = await generate('effect-focus effect-outline-ring')

    expect(focus).toContain(':focus-within')
    expect(focus).toContain(':focus-visible')
    expect(focus).toContain('transition-duration:200ms;')
  })

  it('generates every effect shortcut', async () => {
    const css = await generate(
      [
        'effect-selected',
        'effect-focus',
        'effect-interactive',
        'effect-outline-ring',
        'effect-disabled',
        'effect-skeleton',
        'effect-shadow',
        'effect-border',
        'effect-highlight',
      ].join(' '),
    )

    expect(css).toContain('.effect-selected{')
    expect(css).toContain('.effect-focus:focus-within{')
    expect(css).toContain('.effect-interactive:hover{')
    expect(css).toContain('.effect-interactive:active{')
    expect(css).toContain('.effect-outline-ring:focus-visible{')
    expect(css).toContain('.effect-disabled:disabled{')
    expect(css).toContain('.effect-skeleton{')
    expect(css).toContain('.effect-shadow:hover{')
    expect(css).toContain('.effect-border:hover{')
    expect(css).toContain('.effect-highlight:hover{')
  })
})

describe('options', () => {
  it('applies a custom prefix', async () => {
    const unprefixed = await generate('b-t-primary')

    expect(unprefixed).toContain('border-top-width:1px;')

    const prefixed = await generate('u-b-t-primary', { prefix: 'u-' })

    expect(prefixed).toContain('border-top-width:1px;')
  })

  it('does not match unprefixed utilities when a prefix is set', async () => {
    const css = await generate('b-t-primary', { prefix: 'u-' })

    expect(css).not.toContain('border-top-width')
  })

  it('applies the prefix to shortcuts', async () => {
    const prefixed = await generate('u-flex-between', { prefix: 'u-' })

    expect(prefixed).toContain('justify-content:space-between;')

    const unprefixed = await generate('flex-between', { prefix: 'u-' })

    expect(unprefixed).not.toContain('justify-content:space-between;')
  })
})
