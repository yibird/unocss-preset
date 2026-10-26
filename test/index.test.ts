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
        brand: { 500: '#123456' },
        'light-blue': { 500: '#0ea5e9' },
        regular: 'rgb(var(--w-border-regular))',
      },
    },
  })
  const { css } = await uno.generate(input, { preflights })
  return css
}

describe('border rules', () => {
  it('defaults to a solid border when no style is given', async () => {
    const css = await generate('b-t-1-primary')

    expect(css).toContain('.b-t-1-primary{border-top:1px solid #3b82f6;}')
  })

  it('applies to all directions when no direction is given', async () => {
    const css = await generate('b-1-red')

    expect(css).toContain('.b-1-red{border:1px solid red;}')
  })

  it('emits a single border shorthand without a direction', async () => {
    const css = await generate('b-2-red')

    expect(css).toContain('.b-2-red{border:2px solid red;}')
    expect(css).not.toContain('border-top-width')
  })

  it('supports style, width and color', async () => {
    const css = await generate('b-b-dashed-2-red')

    expect(css).toContain('.b-b-dashed-2-red{border-bottom:2px dashed red;}')
  })

  it('supports every style', async () => {
    const css = await generate(
      'b-t-solid-1-red b-r-dashed-2-blue b-b-dotted-3-green b-l-double-4-black',
    )

    expect(css).toContain('.b-t-solid-1-red{border-top:1px solid red;}')
    expect(css).toContain('.b-r-dashed-2-blue{border-right:2px dashed blue;}')
    expect(css).toContain('.b-b-dotted-3-green{border-bottom:3px dotted green;}')
    expect(css).toContain('.b-l-double-4-black{border-left:4px double #000;}')
  })

  it('supports a style without a direction', async () => {
    const css = await generate('b-dotted-2-blue')

    expect(css).toContain('.b-dotted-2-blue{border:2px dotted blue;}')
  })

  it('supports an explicit solid style without a direction', async () => {
    const css = await generate('b-solid-1-red')

    expect(css).toContain('.b-solid-1-red{border:1px solid red;}')
  })

  it('supports width without an explicit style', async () => {
    const css = await generate('b-l-2-red')

    expect(css).toContain('.b-l-2-red{border-left:2px solid red;}')
  })

  it('requires an explicit width', async () => {
    const css = await generate('b-t-blue b-dotted-primary b-red b-dashed-red')

    expect(css).not.toContain('border-top:')
    expect(css).not.toContain('border-left:')
  })

  it('supports every single direction', async () => {
    const css = await generate('b-t-1-red b-r-2-blue b-b-3-green b-l-4-black')

    expect(css).toContain('.b-t-1-red{border-top:1px solid red;}')
    expect(css).toContain('.b-r-2-blue{border-right:2px solid blue;}')
    expect(css).toContain('.b-b-3-green{border-bottom:3px solid green;}')
    expect(css).toContain('.b-l-4-black{border-left:4px solid #000;}')
  })

  it('supports the all direction', async () => {
    const css = await generate('b-all-2-red')

    expect(css).toContain('.b-all-2-red{border:2px solid red;}')
  })

  it('treats all the same as omitting the direction', async () => {
    const withAll = await generate('b-all-1-primary')
    const withoutDirection = await generate('b-1-primary')
    const declarations = (css: string) => css.slice(css.indexOf('{') + 1)

    expect(declarations(withAll)).toEqual(declarations(withoutDirection))
  })

  it('supports a style with the all direction', async () => {
    const css = await generate('b-all-dashed-1-red')

    expect(css).toContain('.b-all-dashed-1-red{border:1px dashed red;}')
  })

  it('expands x to left and right only', async () => {
    const css = await generate('b-x-dotted-3-red')

    expect(css).toContain('border-left:3px dotted red;')
    expect(css).toContain('border-right:3px dotted red;')
    expect(css).not.toContain('border-top:')
    expect(css).not.toContain('border-bottom:')
  })

  it('expands y to top and bottom only', async () => {
    const css = await generate('b-y-double-1-blue')

    expect(css).toContain('border-top:1px double blue;')
    expect(css).toContain('border-bottom:1px double blue;')
    expect(css).not.toContain('border-left:')
    expect(css).not.toContain('border-right:')
  })

  it('handles zero and multi-digit widths', async () => {
    const css = await generate('b-t-0-red b-b-12-blue')

    expect(css).toContain('border-top:0px solid red;')
    expect(css).toContain('border-bottom:12px solid blue;')
  })

  it('ignores unsupported styles', async () => {
    const css = await generate('b-t-wavy-2-red b-wavy-2-red b-t-Solid-2-red')

    expect(css).not.toContain('border-top:')
    expect(css).not.toContain('border-left:')
  })

  it('ignores an unsupported order', async () => {
    const css = await generate('b-t-red-1 b-t-red-dashed-1')

    expect(css).not.toContain('border-top:')
  })

  it('does not support arbitrary widths', async () => {
    const css = await generate('b-t-[2px]-red')

    expect(css).not.toContain('border-top:')
  })

  it('requires a color', async () => {
    const css = await generate('b-t-1 b-t-1-')

    expect(css).not.toContain('border-top:')
  })

  it('resolves theme colors', async () => {
    const css = await generate('b-t-1-primary')

    expect(css).toContain('border-top:1px solid #3b82f6;')
    expect(css).not.toContain('border-top:1px solid primary;')
  })

  it('resolves nested theme colors', async () => {
    const css = await generate('b-t-1-blue-500 b-t-1-brand-500 b-t-1-light-blue-500')

    expect(css).toContain('border-top:1px solid')
    expect(css).not.toContain('border-top:1px solid blue-500;')
    expect(css).toContain('border-top:1px solid #123456;')
    expect(css).toContain('border-top:1px solid #0ea5e9;')
  })

  it('supports raw CSS colors', async () => {
    const css = await generate('b-1-red b-1-rebeccapurple')

    expect(css).toContain('.b-1-red{border:1px solid red;}')
    expect(css).toContain('.b-1-rebeccapurple{border:1px solid rebeccapurple;}')
  })

  it('supports color functions', async () => {
    const css = await generate('b-t-1-rgb(1,2,3) b-t-1-hsl(0,0%,0%) b-t-1-oklch(70%,0.1,200)')

    expect(css).toContain('border-top:1px solid rgb(1,2,3);')
    expect(css).toContain('border-top:1px solid hsl(0,0%,0%);')
    expect(css).toContain('border-top:1px solid oklch(70%,0.1,200);')
  })

  it('supports arbitrary colors', async () => {
    const css = await generate('b-t-1-[#fff] b-b-1-[rgb(1,2,3)] b-x-1-[var(--bc)]')

    expect(css).toContain('border-top:1px solid #fff;')
    expect(css).toContain('border-bottom:1px solid rgb(1,2,3);')
    expect(css).toContain('border-left:1px solid var(--bc);')
    expect(css).toContain('border-right:1px solid var(--bc);')
  })

  it('resolves theme colors inside brackets', async () => {
    const css = await generate('b-1-[primary] b-t-1-[brand-500] b-t-1-[light-blue-500]')

    expect(css).toContain('.b-1-\\[primary\\]{border:1px solid #3b82f6;}')
    expect(css).toContain('border-top:1px solid #123456;')
    expect(css).toContain('border-top:1px solid #0ea5e9;')
    expect(css).not.toContain('border:1px solid primary;')
    expect(css).not.toContain('border-top:1px solid brand-500;')
  })

  it('supports opacity on bracketed theme colors', async () => {
    const css = await generate('b-t-1-[primary]/50')

    expect(css).toContain('border-top:1px solid color-mix(in srgb, #3b82f6 50%, transparent);')
  })

  it('strips a border- prefix when resolving theme colors', async () => {
    const css = await generate('b-1-[border-regular]')

    expect(css).toContain('border:1px solid rgb(var(--w-border-regular));')
    expect(css).not.toContain('border:1px solid border-regular;')
  })

  it('strips a border- prefix without brackets', async () => {
    const css = await generate('b-t-1-border-regular')

    expect(css).toContain('border-top:1px solid rgb(var(--w-border-regular));')
  })

  it('resolves bracketed theme tokens for x and y directions', async () => {
    const css = await generate('b-y-1-[border-regular] b-x-1-[border-regular]')

    expect(css).toContain('border-top:1px solid rgb(var(--w-border-regular));')
    expect(css).toContain('border-bottom:1px solid rgb(var(--w-border-regular));')
    expect(css).toContain('border-left:1px solid rgb(var(--w-border-regular));')
    expect(css).toContain('border-right:1px solid rgb(var(--w-border-regular));')
    expect(css).not.toContain('border-regular;')
  })

  it('coexists with UnoCSS border color utilities', async () => {
    const css = await generate('border-regular bg-regular b-1-[border-regular]')

    expect(css).toContain('.border-regular{border-color:')
    expect(css).toContain('.bg-regular{background-color:')
    expect(css).toContain(
      '.b-1-\\[border-regular\\]{border:1px solid rgb(var(--w-border-regular));}',
    )
  })

  it('supports opacity modifiers', async () => {
    const css = await generate('b-t-1-primary/50 b-t-1-red/[0.5]')

    expect(css).toContain('border-top:1px solid color-mix(in srgb, #3b82f6 50%, transparent);')
    expect(css).toContain('border-top:1px solid color-mix(in srgb, red 50%, transparent);')
  })

  it('supports decimal, percentage and arbitrary opacity values', async () => {
    const css = await generate('b-1-primary/0.5 b-1-primary/[0.25] b-1-primary/25% b-1-primary/100')

    expect(css).toContain('border:1px solid color-mix(in srgb, #3b82f6 50%, transparent);')
    expect(css).toContain('border:1px solid color-mix(in srgb, #3b82f6 25%, transparent);')
    expect(css).toContain('border:1px solid color-mix(in srgb, #3b82f6 100%, transparent);')
  })

  it('supports opacity on arbitrary colors', async () => {
    const css = await generate('b-1-[#fff]/50')

    expect(css).toContain('border:1px solid color-mix(in srgb, #fff 50%, transparent);')
  })

  it('ignores invalid opacity values', async () => {
    const css = await generate('b-t-1-red/abc b-t-1-primary/nope')

    expect(css).not.toContain('border-top:')
  })

  it('rejects empty and negative opacity values', async () => {
    const css = await generate('b-t-1-red/[] b-t-1-red/-1')

    expect(css).not.toContain('border-top:')
  })

  it('supports leading-dot percentage opacity', async () => {
    const css = await generate('b-t-1-red/.5%')

    expect(css).toContain('border-top:1px solid color-mix(in srgb, red .5%, transparent);')
  })

  it('keeps slashes inside arbitrary values', async () => {
    const css = await generate('b-t-1-[rgb(1_2_3_/_50%)]')

    expect(css).toContain('border-top:1px solid rgb(1 2 3 / 50%);')
  })

  it('still supports opacity after an arbitrary value', async () => {
    const css = await generate('b-t-1-[rgb(1,2,3)]/50')

    expect(css).toContain('border-top:1px solid color-mix(in srgb, rgb(1,2,3) 50%, transparent);')
  })

  it('passes bare color tokens through and ignores unknown multi-part tokens', async () => {
    const css = await generate('b-t-1-unknown-color b-t-1-transparent')

    expect(css).toContain('border-top:1px solid transparent;')
    expect(css).not.toContain('unknown-color')
  })

  it('works with variants', async () => {
    const css = await generate('hocus:b-t-1-primary')

    expect(css).toContain(':hover')
    expect(css).toContain(':focus-visible')
    expect(css).toContain('border-top:1px solid #3b82f6;')
  })

  it('supports the all direction with opacity', async () => {
    const css = await generate('b-all-1-primary/50')

    expect(css).toContain('border:1px solid color-mix(in srgb, #3b82f6 50%, transparent);')
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

  it('expands extended layout shortcuts', async () => {
    const css = await generate(
      'flex-around flex-items-baseline flex-col-center grid-items-center grid-2-cols absolute-fill',
    )

    expect(css).toContain('justify-content:space-around;')
    expect(css).toContain('align-items:baseline;')
    expect(css).toContain('flex-direction:column;')
    expect(css).toContain('place-items:center;')
    expect(css).toContain('grid-template-columns:repeat(2,minmax(0,1fr));')
    expect(css).toContain('position:absolute;')
    expect(css).toContain('inset:')
  })

  it('expands text clamp and layer shortcuts', async () => {
    const css = await generate('text-clamp-2 text-clamp-5 layer-base layer-modal')

    expect(css).toContain('-webkit-line-clamp:2')
    expect(css).toContain('-webkit-line-clamp:5')
    expect(css).toContain('line-clamp:2')
    expect(css).toContain('line-clamp:5')
    expect(css).toContain('z-index:0;')
    expect(css).toContain('position:fixed;')
    expect(css).toContain('z-index:40;')
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
    const unprefixed = await generate('b-t-1-primary')

    expect(unprefixed).toContain('border-top:1px solid #3b82f6;')

    const prefixed = await generate('u-b-t-1-primary', { prefix: 'u-' })

    expect(prefixed).toContain('border-top:1px solid #3b82f6;')
  })

  it('does not match unprefixed utilities when a prefix is set', async () => {
    const css = await generate('b-t-1-primary', { prefix: 'u-' })

    expect(css).not.toContain('border-top-width')
  })

  it('applies the prefix to shortcuts', async () => {
    const prefixed = await generate('u-flex-between', { prefix: 'u-' })

    expect(prefixed).toContain('justify-content:space-between;')

    const unprefixed = await generate('flex-between', { prefix: 'u-' })

    expect(unprefixed).not.toContain('justify-content:space-between;')
  })

  it('resolves border colors from options', async () => {
    const css = await generate('b-1-[border-accent] b-t-1-accent', {
      borderColors: { accent: 'rgb(var(--w-border-accent))' },
    })

    expect(css).toContain('border:1px solid rgb(var(--w-border-accent));')
    expect(css).toContain('border-top:1px solid rgb(var(--w-border-accent));')
  })

  it('supports nested border color tokens from options', async () => {
    const css = await generate('b-1-[border-accent-strong]', {
      borderColors: { accent: { strong: '#123456' } },
    })

    expect(css).toContain('border:1px solid #123456;')
  })
})
