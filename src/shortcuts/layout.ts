/**
 * Flex layout shortcuts.
 *
 * - `flex-center` / `flex-x-center` / `flex-y-center`
 * - `flex-between` / `flex-between-center` / `flex-center-between`
 */
const flexLayouts = {
  'flex-center': 'flex justify-center items-center',
  'flex-x-center': 'flex justify-center',
  'flex-y-center': 'flex items-center',
  'flex-between': 'flex justify-between',
  'flex-between-center': 'flex justify-between items-center',
  'flex-center-between': 'flex justify-center items-stretch',
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
}

export const layouts = {
  ...flexLayouts,
  ...gridLayouts,
  ...positionLayouts,
}
