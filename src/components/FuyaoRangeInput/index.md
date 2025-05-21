---
title: FuyaoRangeInput 按钮
nav:
  title: 组件
  path: /components
group:
  title: 通用
  order: 1

toc: content
---

`FuyaoRangeInput` 是一个基于 Ant Design 的 InputNumber 组件封装的范围输入框组件，用于输入数值范围。

## 功能特点

- 支持输入最小值和最大值
- 可自定义分隔符
- 支持设置输入框之间的间距
- 支持允许起止位置为空
- 支持自定义占位符
- 继承 Ant Design InputNumber 的所有属性

## 使用方法

```tsx
import { FuyaoRangeInput } from 'fuyao-ui';

// 基础用法

export default () => (
  <FuyaoRangeInput value={[1, 100]} onChange={(value) => console.log(value)} />
);
```

## API

### 属性

| 参数         | 说明                             | 类型                                                           | 默认值                 |
| ------------ | -------------------------------- | -------------------------------------------------------------- | ---------------------- |
| value        | 当前值                           | `[number \| undefined, number \| undefined]`                   | -                      |
| defaultValue | 默认值                           | `[number \| undefined, number \| undefined]`                   | -                      |
| onChange     | 值变化时的回调函数               | `(value?: [number \| undefined, number \| undefined]) => void` | -                      |
| allowEmpty   | 是否允许起止位置为空             | `[boolean, boolean]`                                           | `[false, false]`       |
| separator    | 分隔符                           | `string`                                                       | `-`                    |
| margin       | 输入框及分隔符之间的间隔（像素） | `number`                                                       | `6`                    |
| placeholder  | 占位符，可以是字符串或字符串数组 | `string \| [string, string]`                                   | `['最小值', '最大值']` |

### 继承属性

组件继承了 Ant Design 的 InputNumber 组件的所有属性，除了以下属性：

- value
- defaultValue
- onChange
- onBlur
- placeholder

## 注意事项

1. 当输入的值不合法时（如最小值大于最大值），组件会在失焦时清空输入值
2. 如果设置了 `allowEmpty`，则允许对应的输入框为空
3. 组件会自动处理数值的合法性验证，确保最小值不大于最大值
