---
title: FuyaoModal 弹窗
nav:
  title: 组件
  path: /components
---

# FuyaoModal 弹窗

富耀弹窗组件，基于 antd Modal 封装，提供了更便捷的使用方式。

## 代码演示

### 基础用法

```tsx
import React from 'react';
import { Button } from 'antd';
import FuyaoModal from './index';
import { useModal } from 'fuyao-ui';

export default () => {
  const modal = useModal();

  return (
    <>
      <Button onClick={() => modal.setInstance({ open: () => {} })}>
        打开弹窗
      </Button>
      <FuyaoModal
        modal={modal}
        title="基础弹窗"
        onOk={() => {
          console.log('确认');
        }}
      >
        这是一个基础弹窗示例
      </FuyaoModal>
    </>
  );
};
```

### 异步确认

```tsx
import React from 'react';
import { Button } from 'antd';
import FuyaoModal from './index';
import { useModal } from 'fuyao-ui';

export default () => {
  const modal = useModal();

  return (
    <>
      <Button onClick={() => modal.setInstance({ open: () => {} })}>
        打开弹窗
      </Button>
      <FuyaoModal
        modal={modal}
        title="异步确认"
        beforeOk={async () => {
          // 模拟异步操作
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return true;
        }}
        onOk={async () => {
          console.log('确认');
        }}
      >
        这是一个异步确认的弹窗示例
      </FuyaoModal>
    </>
  );
};
```

### 隐藏底部按钮

```tsx
import React from 'react';
import { Button } from 'antd';
import FuyaoModal from './index';
import { useModal } from 'fuyao-ui';

export default () => {
  const modal = useModal();

  return (
    <>
      <Button onClick={() => modal.setInstance({ open: () => {} })}>
        打开弹窗
      </Button>
      <FuyaoModal modal={modal} title="无底部按钮" hideFooter>
        这是一个没有底部按钮的弹窗示例
      </FuyaoModal>
    </>
  );
};
```

## API

### FuyaoModal

| 参数               | 说明                                                                                                | 类型                                | 默认值  |
| ------------------ | --------------------------------------------------------------------------------------------------- | ----------------------------------- | ------- |
| modal              | 弹窗绑定实例                                                                                        | `FuyaoModalInstance`                | -       |
| onOpen             | 打开窗口后的回调                                                                                    | `(arg?: any) => void`               | -       |
| onClose            | 关闭窗口后的回调                                                                                    | `(type?: 'cancel' \| 'ok') => void` | -       |
| beforeOk           | 确认前的校验，如果返回 false 则不执行确认回调，如果有其他返回值，则作为确认回调的参数传递，支持异步 | `() => any`                         | -       |
| onOk               | 确认按钮回调                                                                                        | `(arg?: any) => void`               | -       |
| onCancel           | 取消按钮回调                                                                                        | `() => void`                        | -       |
| hideFooter         | 隐藏底部按钮                                                                                        | `boolean`                           | `false` |
| defaultVisible     | 默认是否弹出（方便开发调试）                                                                        | `boolean`                           | `false` |
| showConfirmLoading | 是否显示确定按钮 loading 状态                                                                       | `boolean`                           | -       |

除了以上属性，组件还支持 antd Modal 的所有属性。

### FuyaoModalInstance

| 属性        | 说明         | 类型                                                                                                                                      |
| ----------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| opened      | 弹窗是否打开 | `boolean`                                                                                                                                 |
| setInstance | 设置弹窗实例 | `(instance: { open: (arg?: any) => void; close: (type?: 'cancel' \| 'ok') => void; trigger: (type: 'ok' \| 'cancel') => void; }) => void` |

### useModal

用于创建弹窗实例的 Hook。

```tsx
import { useModal } from 'fuyao-ui';

const modal = useModal();
```
