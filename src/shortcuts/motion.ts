// Spring easing gives movement shortcuts their bounce.
const easeMotion = 'ease-[cubic-bezier(0.34,1.56,0.64,1)]'

export const motions = {
  // 按下弹簧效果
  'motion-press': `transition-transform duration-300 ${easeMotion} active:scale-[0.96] motion-reduce:transition-none`,
  // 悬浮浮起
  'motion-float': `transition-transform duration-200 ${easeMotion} hover:-translate-y-1`,
  // 悬浮放大
  'motion-scale': `transition-transform duration-200 ${easeMotion} hover:scale-[1.02]`,
  // 悬浮缩小
  'motion-shrink': `transition-transform duration-200 ${easeMotion} hover:scale-[0.98]`,
  // 悬浮旋转
  'motion-rotate': `transition-transform duration-200 ${easeMotion} hover:rotate-3`,
  // 悬浮透明度变化
  'motion-fade': `transition-opacity duration-200 ${easeMotion} hover:opacity-70`,
}
