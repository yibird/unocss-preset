/**
 * Flex layout shortcuts
 */
const flexLayouts = {
  // 主轴与交叉轴居中
  'flex-center': 'flex justify-center items-center',
  'flex-x-center': 'flex justify-center',
  'flex-y-center': 'flex items-center',

  // 主轴对齐
  'flex-start': 'flex justify-start',
  'flex-end': 'flex justify-end',
  'flex-between': 'flex justify-between',
  'flex-around': 'flex justify-around',
  'flex-evenly': 'flex justify-evenly',

  // 交叉轴对齐
  'flex-items-start': 'flex items-start',
  'flex-items-end': 'flex items-end',
  'flex-items-center': 'flex items-center',
  'flex-items-baseline': 'flex items-baseline',
  'flex-items-stretch': 'flex items-stretch',

  // 组合对齐
  'flex-between-center': 'flex justify-between items-center',
  'flex-start-center': 'flex justify-start items-center',
  'flex-end-center': 'flex justify-end items-center',
  'flex-center-start': 'flex justify-center items-start',
  'flex-center-end': 'flex justify-center items-end',
  'flex-center-stretch': 'flex justify-center items-stretch',

  // 常见布局
  'flex-col-center': 'flex flex-col items-center',
  'flex-col-start': 'flex flex-col items-start',
  'flex-col-end': 'flex flex-col items-end',
  'flex-col-between': 'flex flex-col justify-between',
  'flex-col-between-center': 'flex flex-col justify-between items-center',
  'flex-col-center-center': 'flex flex-col justify-center items-center',
}

/**
 * Grid layout shortcuts, including `grid-equal-cols` which auto-fits
 * equal-width columns.
 */
const gridLayouts = {
  'grid-center': 'grid place-content-center',
  'grid-x-center': 'grid justify-center',
  'grid-y-center': 'grid items-center',
  'grid-stretch': 'grid items-stretch',
  'grid-between': 'grid justify-between',
  'grid-between-center': 'grid justify-between items-center',
  'grid-center-between': 'grid place-content-between',
  'grid-equal-cols': 'grid grid-cols-[repeat(auto-fit,minmax(0,1fr))]',

  // 网格项对齐
  'grid-items-center': 'grid place-items-center',
  'grid-items-start': 'grid place-items-start',
  'grid-items-end': 'grid place-items-end',

  // 自适应列
  'grid-auto-cols': 'grid grid-flow-col auto-cols-fr',
  'grid-auto-rows': 'grid grid-flow-row auto-rows-fr',

  // 常见列布局
  'grid-cols-fit-sm': 'grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]',
  'grid-cols-fit-md': 'grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]',
  'grid-cols-fit-lg': 'grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]',

  // 常见行列布局
  'grid-2-cols': 'grid grid-cols-2',
  'grid-3-cols': 'grid grid-cols-3',
  'grid-4-cols': 'grid grid-cols-4',

  // 铺满网格容器
  'grid-full': 'grid grid-cols-1',
}

/**
 * Absolute/fixed centering shortcuts, aligned on both axes or a single axis.
 */
const positionLayouts = {
  'absolute-center': 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  'absolute-x-center': 'absolute left-1/2 transform -translate-x-1/2',
  'absolute-y-center': 'absolute top-1/2 transform -translate-y-1/2',

  'fixed-center': 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  'fixed-x-center': 'fixed left-1/2 transform -translate-x-1/2',
  'fixed-y-center': 'fixed top-1/2 transform -translate-y-1/2',

  // 四角定位
  'absolute-top-left': 'absolute top-0 left-0',
  'absolute-top-right': 'absolute top-0 right-0',
  'absolute-bottom-left': 'absolute bottom-0 left-0',
  'absolute-bottom-right': 'absolute bottom-0 right-0',

  'fixed-top-left': 'fixed top-0 left-0',
  'fixed-top-right': 'fixed top-0 right-0',
  'fixed-bottom-left': 'fixed bottom-0 left-0',
  'fixed-bottom-right': 'fixed bottom-0 right-0',

  // 边缘居中
  'absolute-top-center': 'absolute top-0 left-1/2 -translate-x-1/2',
  'absolute-bottom-center': 'absolute bottom-0 left-1/2 -translate-x-1/2',
  'absolute-left-center': 'absolute left-0 top-1/2 -translate-y-1/2',
  'absolute-right-center': 'absolute right-0 top-1/2 -translate-y-1/2',

  'fixed-top-center': 'fixed top-0 left-1/2 -translate-x-1/2',
  'fixed-bottom-center': 'fixed bottom-0 left-1/2 -translate-x-1/2',
  'fixed-left-center': 'fixed left-0 top-1/2 -translate-y-1/2',
  'fixed-right-center': 'fixed right-0 top-1/2 -translate-y-1/2',

  // 铺满容器
  'absolute-fill': 'absolute inset-0',
  'fixed-fill': 'fixed inset-0',
}

export const layouts = {
  ...flexLayouts,
  ...gridLayouts,
  ...positionLayouts,
}
