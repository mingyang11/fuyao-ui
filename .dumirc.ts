// .dumirc.ts
import { defineConfig } from 'dumi';

export default defineConfig({
  logo: false,
  // 开启 themeConfig 配置
  themeConfig: {
    // 导航栏配置
    nav: [
      { title: '指南', link: '/guide' },
      { title: '组件', link: '/components' },
    ],
    // 侧边栏配置
    sidebar: {
      // 组件页面的侧边栏
      '/components': [
        {
          title: '通用',
          children: [
            { title: 'Button 按钮', link: '/components/button' },
            // 其他通用组件...
          ],
        },
        {
          title: '布局',
          children: [
            { title: 'Space 间距', link: '/components/space' },
            // 其他布局组件...
          ],
        },
        // 其他组件分组...
      ],
    },
  },
  // 使用约定式路由
  resolve: {
    // 配置组件库文档目录解析规则
    atomDirs: [{ type: 'component', dir: 'src' }],
    // 组件文档目录
    docDirs: ['docs'],
  },
});
