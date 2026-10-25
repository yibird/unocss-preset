import { textSizeRules } from './text'
import { borderRules } from './border'
import { contentVisibilityRules } from './content-visibility'
import { shadowRules } from './shadow'

export const rules = [...borderRules, ...textSizeRules, ...contentVisibilityRules, ...shadowRules]
