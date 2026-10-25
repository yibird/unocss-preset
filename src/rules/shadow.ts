import type { Rule } from '@unocss/core'

type Direction = 't' | 'r' | 'b' | 'l' | 'all'
type SizeKey = 'sm' | 'md' | '' | 'lg' | 'xl' | '2xl'

interface Size {
  offset: number
  blur: number
  spread: number
  color: string
}
type BoxShadowStyles = Record<string, { 'box-shadow': string }>

const directions: Direction[] = ['t', 'r', 'b', 'l', 'all']
const sizes: Record<SizeKey, Size> = {
  sm: { offset: 1, blur: 2, spread: 0, color: 'rgba(0, 0, 0, 0.05)' },
  '': { offset: 1, blur: 3, spread: 0, color: 'rgba(0, 0, 0, 0.1)' },
  md: { offset: 4, blur: 6, spread: -1, color: 'rgba(0, 0, 0, 0.1)' },
  lg: { offset: 10, blur: 15, spread: -3, color: 'rgba(0, 0, 0, 0.1)' },
  xl: { offset: 20, blur: 25, spread: -5, color: 'rgba(0, 0, 0, 0.1)' },
  '2xl': { offset: 25, blur: 50, spread: -12, color: 'rgba(0, 0, 0, 0.25)' },
}

function generateBoxShadows() {
  return directions.reduce((acc: BoxShadowStyles, direction: Direction) => {
    Object.keys(sizes).forEach((sizeKey: string) => {
      const size = sizes[sizeKey as SizeKey]
      const key = `${direction}${sizeKey ? '-' + sizeKey : sizeKey}`
      let boxShadow: string

      if (direction === 'all') {
        boxShadow = `0px 0px ${size.blur}px ${size.spread}px ${size.color}`
      } else {
        const horizontalOffset = ['l', 'r'].includes(direction)
          ? direction === 'r'
            ? size.offset
            : -size.offset
          : 0
        const verticalOffset = ['t', 'b'].includes(direction)
          ? direction === 'b'
            ? size.offset
            : -size.offset
          : 0
        boxShadow = `${horizontalOffset}px ${verticalOffset}px ${size.blur}px ${size.spread}px ${size.color}`
      }
      acc[key] = { 'box-shadow': boxShadow }
    })
    return acc
  }, {} as BoxShadowStyles)
}

const shadows = generateBoxShadows()

/**
 * 规则格式: shadow-[方向][-尺寸]
 *
 * - 方向: `t` / `r` / `b` / `l` / `all`，不写时等同于 `all`
 * - 尺寸: `sm` / `md` / `lg` / `xl` / `2xl`，不写时为默认尺寸
 */
export const shadowRules: Rule[] = [
  [
    /^shadow-(?:([trbl]|all)(?:-(sm|md|lg|xl|2xl))?|(sm|md|lg|xl|2xl))$/,
    ([, direction, size, sizeOnly]) => {
      const resolvedSize = size ?? sizeOnly
      const key = `${direction ?? 'all'}${resolvedSize ? `-${resolvedSize}` : ''}`
      return shadows[key]
    },
  ],
]
