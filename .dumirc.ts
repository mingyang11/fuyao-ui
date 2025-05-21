// .dumirc.ts
import { defineConfig } from 'dumi';

export default defineConfig({
  logo: false,
  // 开启 themeConfig 配置
  themeConfig: {
    // 导航栏配置
    nav: [
      { title: '指南', link: '/guide/log' },
      { title: '组件', link: '/components/fuyao-button' },
    ],
    // 侧边栏配置
    sidebar: {
      '/guide': [
        {
          title: '指南',
          children: [
            { title: '更新日志', link: '/guide/log' },
            { title: '快速开始', link: '/guide/quickstart' },
          ],
        },
      ],
      // 组件页面的侧边栏
      '/components': [
        {
          title: '通用',
          children: [
            { title: 'FuyaoButton', link: '/components/fuyao-button' },
            { title: 'FuyaoEmpty', link: '/components/fuyao-empty' },
            { title: 'FuyaoBlockTitle', link: '/components/fuyao-block-title' },
            { title: 'FuyaoRangeInput', link: '/components/fuyao-range-input' },
          ],
        },
        // {
        //   title: '布局',
        //   children: [{ title: 'Space 间距', link: '/components/space' }],
        // },
      ],
    },
    // 配置 toc 目录
    toc: {
      // 是否显示目录
      show: true,
      // 目录层级
      level: 3,
      // 目录标题
      title: '目录',
    },
  },
  // 使用约定式路由
  resolve: {
    // 配置组件库文档目录解析规则
    atomDirs: [
      { type: 'component', dir: 'src/components' },
      { type: 'doc', dir: 'src/components' },
    ],
    // 组件文档目录
    docDirs: ['docs'],
  },
  // 配置主题
  theme: {
    '@c-primary': '#1890ff',
    '@c-success': '#52c41a',
    '@c-warning': '#faad14',
    '@c-error': '#f5222d',
    '@c-heading': '#0d1a26',
    '@c-text': '#314659',
    '@c-text-secondary': '#697b8c',
    '@c-border': '#ebedf0',
    '@c-site-bg': '#f5f8fa',
    '@c-bg': '#fff',
    '@c-bg-light': '#fafafa',
    '@c-bg-lighter': '#f5f5f5',
    '@c-bg-lightest': '#fafafa',
    '@c-bg-dark': '#f0f2f5',
    '@c-bg-darker': '#e6e6e6',
    '@c-bg-darkest': '#d9d9d9',
  },
});
