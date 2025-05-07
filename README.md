# Fuyao UI 组件库

Fuyao UI 是一个基于 React 的轻量级组件库，提供了常用的 UI 组件。

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
