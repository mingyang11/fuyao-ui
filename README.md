# Fuyao UI 组件库

Fuyao UI 是一个基于 Antd 的 React 组件库，提供了一系列易用的UI组件。

## 已重构组件

以下组件已经从 componentsRebase 中重构到 components 中：

1. **FuyaoButton**: 按钮组件，支持权限控制和防抖功能
2. **FuyaoEmpty**: 空状态组件，支持多种空状态展示
3. **FuyaoIcon**: 图标组件，基于 Antd Icon
4. **FuyaoMaskLoading**: 全局遮罩加载组件
5. **FuyaoCondition**: 条件组合组件，用于构建复杂查询条件
6. **FuyaoInput**: 输入框组件，包含Input、TextArea和其他变体
7. **FuyaoSelect**: 选择器组件，支持全选功能

## 重构规则

重构过程遵循以下规则：

1. 只重构了以Serv开头的组件
2. 使用函数式组件写法
3. 将"serv"开头的命名替换为"fuyao"
4. 将公共方法提取到utils目录

## 工具函数

重构过程中创建了以下工具函数：

- `classnames`: 类名工具函数，用于合并多个className
- `types`: 类型判断工具，包含isPlainObject、isFunction等函数
- `useObjectState`: 对象状态管理钩子

## 使用方法

```jsx
import {
  FuyaoButton,
  FuyaoEmpty,
  FuyaoIcon,
  FuyaoInput,
  FuyaoMaskLoading,
  FuyaoSelect
} from './components';

// 使用按钮
<FuyaoButton type="primary">按钮</FuyaoButton>

// 使用空状态
<FuyaoEmpty type="暂无内容" />

// 使用选择器
<FuyaoSelect
  options={[
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 }
  ]}
  showSelectAll
/>
```

## 安装

```bash
npm install fuyao-ui
# 或
yarn add fuyao-ui
```

## 组件

### FuyaoButton 按钮

按钮组件用于触发一个操作。

#### 属性

| 参数      | 说明                 | 类型                   | 默认值    |
| --------- | -------------------- | ---------------------- | --------- |
| type      | 按钮类型             | 'primary' \| 'default' | 'primary' |
| className | 自定义类名           | string                 | -         |
| style     | 自定义样式           | CSSProperties          | -         |
| onClick   | 点击按钮时的回调函数 | MouseEventHandler      | -         |

#### 示例

```tsx
import { FuyaoButton } from 'fuyao-ui';

function App() {
  return (
    <FuyaoButton type="primary" onClick={() => console.log('clicked')}>
      点击我
    </FuyaoButton>
  );
}
```

### FuyaoEmpty 空状态

空状态组件用于展示空状态或异常状态。

#### 属性

| 参数        | 说明           | 类型          | 默认值       |
| ----------- | -------------- | ------------- | ------------ |
| type        | 空状态类型     | EmptyType     | -            |
| description | 自定义描述文字 | string        | 与 type 相同 |
| image       | 自定义图片地址 | string        | -            |
| imageStyle  | 自定义图片样式 | CSSProperties | -            |
| className   | 自定义类名     | string        | -            |
| style       | 自定义样式     | CSSProperties | -            |

#### 支持的空状态类型

- 404页面
- 服务器异常
- 功能
- 合同
- 核实情况
- 加载失败
- 敬请期待
- 没有绑定银行卡
- 纳税人默认头像
- 票据
- 权限不足
- 任务
- 审核完成
- 审核中
- 数据
- 搜索为空
- 图表内容为空
- 网络不给力
- 未绑定电话号码
- 未绑定企业
- 系统维护
- 研发中
- 暂无内容
- 暂无信息
- 帐套
- XX加载失败

#### 示例

```tsx
import { FuyaoEmpty } from 'fuyao-ui';

function App() {
  return <FuyaoEmpty type="暂无数据" description="暂无数据，请稍后再试" />;
}
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建
npm run build
```

## 贡献

欢迎提交 Issue 和 Pull Request。

## 许可证

MIT
