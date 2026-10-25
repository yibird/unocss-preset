# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.3] - 2026-10-25

### Changed

- Border utilities now emit CSS shorthands (`border` for all sides, `border-top` and friends for single sides) instead of three longhands per side
- Simplified the shadow rule internals; generated output is unchanged

### Fixed

- Arbitrary values such as `b-1-[border-regular]` and colors such as `b-1-border-regular` now resolve the `regular` theme token instead of emitting the raw name

### Docs

- Expanded border and shadow examples with direction, style, size, opacity, arbitrary value and theme token cases
- Added theme color tokens to the documentation playground for coexistence checks
- Removed the standalone demo page from the navigation

## [0.0.2] - 2026-10-25

### Added

- Border `all` direction (`b-all-*`) and an all-directions fallback when the direction is omitted
- Theme color resolution inside arbitrary values, for example `b-1-[primary]`
- Directional shadow rules: `shadow-<direction>[-<size>]` with `sm`/`md`/`lg`/`xl`/`2xl`
- Shadow direction is optional and defaults to `all`, for example `shadow-md`
- Border and shadow rule test coverage

### Changed

- **Breaking**: the border syntax is now `b-[direction][-style]-width-color`; width is required and the implicit `1px` default was removed
- Shadow size scale aligned with Tailwind (`md`, `lg`, `xl`, `2xl`)

### Fixed

- Opacity modifiers on arbitrary values containing slashes, for example `b-1-[rgb(1_2_3_/_50%)]`
- Empty and negative opacity values are rejected, while leading-dot percentages are accepted
- Unknown plain-word border colors no longer emit invalid CSS
- Shadow `2xl` no longer collapses because its blur was smaller than the negative spread

## [0.0.1] - 2026-10-23

### Added

- Border rules: `b-<direction>[-<style>][-<width>]-<color>`
- Text-size rules: `text-xs` through `text-5xl` with `font-size` and `line-height`
- `content-visibility` rules: `cv-auto`, `cv-hidden`, `cv-visible`
- `hocus:` variant for `:hover` and `:focus-visible`
- Shortcuts for size, elements, flex/grid/position layouts, motion and interaction effects
- `prefix` option
- VitePress documentation site with Chinese and English guides and a live demo
- Chinese and English README, contributing guides and this changelog
