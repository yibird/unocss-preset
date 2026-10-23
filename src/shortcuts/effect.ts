// Effects are subtle feedback, so use a simple ease-out instead of a spring.
const easeEffect = 'ease-out'

export const effects = {
  // 选中状态
  'effect-selected': 'bg-primary/10 text-primary',
  // 输入框聚焦反馈
  'effect-focus': `transition duration-200 ${easeEffect} focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20`,
  // 通用交互反馈
  'effect-interactive': `cursor-pointer transition-colors duration-200 ${easeEffect} hover:bg-gray-100 active:bg-gray-200`,
  // 聚焦轮廓
  'effect-outline-ring': `transition duration-200 ${easeEffect} outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`,
  // 禁用状态
  'effect-disabled': 'disabled:cursor-not-allowed disabled:opacity-50',
  // 骨架屏基础样式
  'effect-skeleton': 'animate-pulse rounded-md bg-gray-200 dark:bg-gray-800',
  // 悬浮阴影
  'effect-shadow': `transition-shadow duration-200 ${easeEffect} hover:shadow-md`,
  // 悬浮边框高亮
  'effect-border': `transition-colors duration-200 ${easeEffect} hover:border-primary`,
  // 悬浮高亮
  'effect-highlight': `transition-colors duration-200 ${easeEffect} hover:bg-primary/10 hover:border-primary`,
}
