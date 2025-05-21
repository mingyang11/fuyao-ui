---
title: FuyaoBlolckTitle
nav:
  title: 组件
  path: /components
toc: content
---

# FuyaoModal 弹窗

富耀弹窗组件，基于 antd Modal 封装，提供了更便捷的使用方式。

## 代码演示

### 基础用法

```tsx
import { FuyaoBlockTitle } from 'fuyao-ui';

export default () => <FuyaoBlockTitle title="标题" />;
```

### 带描述

```tsx
import { FuyaoBlockTitle } from 'fuyao-ui';

export default () => <FuyaoBlockTitle title="标题" desc="desc" />;
```

### 带有额外元素的

```tsx
import { FuyaoBlockTitle, FuyaoButton } from 'fuyao-ui';

export default () => (
  <FuyaoBlockTitle title="标题" desc="desc">
    <FuyaoButton>删除</FuyaoButton>
  </FuyaoBlockTitle>
);
```

## API

| 参数        | 说明       | 类型                             | 默认值      |
| ----------- | ---------- | -------------------------------- | ----------- |
| `title`     | 主标题     | `React.ReactNode`                | -           |
| `desc`      | 描述信息   | `React.ReactNode`                | -           |
| `className` | 自定义类名 | `string`                         | -           |
| `style`     | 自定义样式 | `React.CSSProperties`            | `{}`        |
| `theme`     | 主题色     | `'orange' \| 'default'`          | `'default'` |
| `size`      | 尺寸       | `'small' \| 'middle' \| 'large'` | `'middle'`  |
| `children`  | 子元素     | `React.ReactNode`                | -           |
