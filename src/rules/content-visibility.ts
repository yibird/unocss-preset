import type { Rule } from '@unocss/core'
const values = ['auto', 'hidden', 'visible'] as const

export const contentVisibilityRules: Rule[] = values.map((value) => [
  `cv-${value}`,
  { 'content-visibility': value },
])
