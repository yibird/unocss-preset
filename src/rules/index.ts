import type { Rule } from '@unocss/core'
import { textSizeRules } from './text'
import { createBorderRules } from './border'
import { contentVisibilityRules } from './content-visibility'
import { shadowRules } from './shadow'

interface RuleOptions {
  borderColors?: unknown
}

export function createRules(options: RuleOptions = {}): Rule[] {
  return [
    ...createBorderRules(options.borderColors),
    ...textSizeRules,
    ...contentVisibilityRules,
    ...shadowRules,
  ]
}
