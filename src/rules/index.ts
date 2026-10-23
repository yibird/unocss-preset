import { textSizeRules } from './text'
import { borderRules } from './border'
import { contentVisibilityRules } from './content-visibility'

export const rules = [...borderRules, ...textSizeRules, ...contentVisibilityRules]
