import { presetWind4 } from '@unocss/preset-wind4'
import UnoCSS from '@unocss/vite'
import { defineConfig } from 'vitepress'
import presetUnocss from '../../src/index'

const zhSidebar = [
  {
    text: '指南',
    items: [
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '规则', link: '/guide/rules' },
      { text: '快捷方式', link: '/guide/shortcuts' },
      { text: '配置项', link: '/guide/options' },
    ],
  },
]

const enSidebar = [
  {
    text: 'Guide',
    items: [
      { text: 'Getting Started', link: '/en/guide/getting-started' },
      { text: 'Rules', link: '/en/guide/rules' },
      { text: 'Shortcuts', link: '/en/guide/shortcuts' },
      { text: 'Options', link: '/en/guide/options' },
    ],
  },
]

export default defineConfig({
  title: 'unocss-preset',
  description: 'A mobile-first UnoCSS preset with border, text-size and effect utilities.',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  cleanUrls: true,
  lastUpdated: true,
  vite: {
    plugins: [
      UnoCSS({
        presets: [presetWind4(), presetUnocss()],
        content: {
          filesystem: ['.vitepress/**/*.{md,ts,vue}', '**/*.md'],
        },
        theme: {
          colors: {
            primary: '#3b82f6',
            // Same token shape as a real project's `borderColorTokens`.
            main: 'rgb(var(--w-border-main))',
            regular: 'rgb(var(--w-border-regular))',
            secondary: 'rgb(var(--w-border-secondary))',
            muted: 'rgb(var(--w-border-muted))',
            placeholder: 'rgb(var(--w-border-placeholder))',
            disabled: 'rgb(var(--w-border-disabled))',
          },
        },
      }),
    ],
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        logo: '/logo.svg',
        nav: [
          { text: '指南', link: '/guide/getting-started' },
          { text: 'English', link: '/en/' },
        ],
        sidebar: zhSidebar,
        outline: { label: '本页目录' },
        docFooter: { prev: '上一页', next: '下一页' },
        langMenuLabel: '切换语言',
        returnToTopLabel: '回到顶部',
        darkModeSwitchLabel: '深色模式',
        sidebarMenuLabel: '菜单',
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        logo: '/logo.svg',
        nav: [
          { text: 'Guide', link: '/en/guide/getting-started' },
          { text: '简体中文', link: '/' },
        ],
        sidebar: enSidebar,
        outline: { label: 'On this page' },
      },
    },
  },
})
