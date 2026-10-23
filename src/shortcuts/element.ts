// Overlays only fade, so a standard easing curve fits better than a spring.
const easeOverlay = 'ease-[cubic-bezier(0.4,0,0.2,1)]'
export const elements = {
  // button
  button:
    'flex items-center justify-center grow-0 shrink-0 bg-transparent border-none outline-none appearance-none touch-none cursor-pointer select-none focus-visible:outline-none',
  'reset-button':
    'p-0 m-0 bg-transparent border-none outline-none appearance-none touch-none cursor-pointer select-none focus-visible:outline-none',
  'block-button':
    'block w-full bg-transparent border-0 border-none outline-none appearance-none box-border cursor-pointer select-none',

  link: 'text-primary cursor-pointer hover:underline',
  'img-cover': 'block w-full h-full object-cover',
  'img-contain': 'block w-full h-full object-contain',
  avatar: 'inline-block rounded-full object-cover shrink-0 bg-gray-100',
  clickable: 'cursor-pointer select-none',

  // 悬浮层
  overlay: `absolute inset-0 w-full h-full z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-200 ${easeOverlay}`,
  'overlay-full': `fixed inset-0 w-full h-full z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-200 ${easeOverlay}`,
}
