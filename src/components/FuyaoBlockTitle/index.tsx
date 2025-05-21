import { ConfigProvider } from 'antd';
import React from 'react';
import { classnames } from '../../utils';
import './index.less';

export interface FuyaoBlockTitleProps {
  /**
   * 主标题
   */
  title: React.ReactNode;
  /**
   * 描述信息
   */
  desc?: React.ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 主题色
   * @default 'default'
   */
  theme?: 'orange' | 'default';
  /**
   * 尺寸
   * @default 'middle'
   */
  size?: 'small' | 'middle' | 'large';
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

const sizeClassNameMap: Record<string, string> = {
  large: 'lg',
  small: 'sm',
  middle: '',
};

/**
 * 富耀区块标题组件
 */
const FuyaoBlockTitle: React.FC<FuyaoBlockTitleProps> = ({
  title,
  desc,
  children,
  className,
  theme = 'default',
  size,
  style = {},
}) => {
  const _size = size || React.useContext(ConfigProvider.SizeContext) || '';
  const sizeCls = _size ? sizeClassNameMap[_size] || '' : '';

  return (
    <div
      className={classnames(
        'fuyao-block-title',
        theme === 'orange' && 'fuyao-block-orange',
        sizeCls && `fuyao-block-title-${sizeCls}`,
        className
      )}
      style={style}
    >
      <div className="primary-panel">
        <span className="b-icon" />
        <div className="b-title">{title}</div>
        <div className="b-desc">{desc}</div>
      </div>
      <div className="slot-panel">{children}</div>
    </div>
  );
};

export default FuyaoBlockTitle;
