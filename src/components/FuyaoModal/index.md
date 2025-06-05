---
title: FuyaoModal
nav:
  title: 组件
  path: /components
toc: content
---

# FuyaoModal 弹窗

弹窗组件，基于 antd Modal 封装，提供了更便捷的使用方式。相比原生 Modal，FuyaoModal 提供了实例化管理、异步确认、更灵活的回调处理等增强功能。

## 代码演示

### 基础用法

通过 `useFuyaoModal` 创建弹窗实例，并与 FuyaoModal 组件绑定。

```tsx
import React from 'react';
import { Button } from 'antd';
import { FuyaoModal, useFuyaoModal } from 'fuyao-ui';

export default () => {
  const modal = useFuyaoModal();

  return (
    <>
      <Button onClick={() => modal.open()}>打开弹窗</Button>
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
