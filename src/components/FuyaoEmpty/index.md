---
title: Empty 空状态
nav:
  title: 组件
  path: /components
group:
  title: 通用
  order: 2
toc: content
---

# Empty 空状态

空状态组件，用于展示空状态时的界面。

## 代码演示

### 基础用法

```jsx
import { FuyaoEmpty } from 'fuyao-ui';

export default () => <FuyaoEmpty type="数据" />;
```

### 自定义描述

```jsx
import { FuyaoEmpty } from 'fuyao-ui';

export default () => <FuyaoEmpty type="数据" description="暂无数据" />;
```

## API

| 参数        | 说明           | 类型            | 默认值   |
| ----------- | -------------- | --------------- | -------- |
| type        | 空状态类型     | `EmptyType`     | `'数据'` |
| description | 自定义描述内容 | `string`        | -        |
| image       | 自定义图片地址 | `string`        | -        |
| imageStyle  | 图片样式       | `CSSProperties` | -        |
