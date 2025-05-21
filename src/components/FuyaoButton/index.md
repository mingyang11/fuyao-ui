---
title: FuyaoButton 按钮
nav:
  title: 组件
  path: /components
group:
  title: 通用
  order: 1

toc: content
---

# Button 按钮

按钮用于开始一个即时操作。

## 代码演示

```jsx
import React from 'react';
import { FuyaoButton } from 'fuyao-ui';

export default () => (
  <div>
    <FuyaoButton type="dashed">Primary Button</FuyaoButton>
    <FuyaoButton>Default Button</FuyaoButton>
  </div>
);
```

## API

| 参数 | 说明         | 类型                           | 默认值    |
| ---- | ------------ | ------------------------------ | --------- |
| size | 设置按钮大小 | `large` \| `middle` \| `small` | `middle`  |
| type | 设置按钮类型 | `primary` \| `default`         | `default` |
