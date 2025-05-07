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
          ],
        },
        // {
        //   title: '布局',
        //   children: [{ title: 'Space 间距', link: '/components/space' }],
        // },
      ],
    },
  },
  // 使用约定式路由
  resolve: {
    // 配置组件库文档目录解析规则
    atomDirs: [{ type: 'component', dir: 'src/components' }],
    // 组件文档目录
    docDirs: ['docs'],
  },
});
