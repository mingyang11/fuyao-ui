import Spin from 'antd/es/spin';
import classNames from 'classnames';
import React, { CSSProperties, ReactNode } from 'react';
import './index.less';

export interface FuyaoMaskLoadingProps {
  /**
   * 加载中
   */
  loading: boolean;
  /**
   * 遮罩 className
   */
  maskClassName?: string;
  /**
   * 遮罩样式
   */
  maskStyle?: CSSProperties;
  /**
   * 加载内容 className
   */
  loadingClassName?: string;
  /**
   * 加载内容样式
   */
  loadingStyle?: CSSProperties;
  /**
   * 完全自定义加载内容
   */
  loadingContent?: ReactNode;
  /**
   * 加载中图标
   */
  loadingIcon?: ReactNode;
  /**
   * 加载中文案
   */
  loadingText?: string;
  /**
   * 子元素
   */
  children?: ReactNode;
}

const FuyaoMaskLoading: React.FC<FuyaoMaskLoadingProps> = (props) => {
  const {
    loading,
    maskClassName,
    maskStyle,
    loadingClassName,
    loadingStyle,
    children,
    loadingContent = children,
    loadingIcon,
    loadingText = '加载中...',
  } = props;

  // useEffect(() => {
  //   if (loading) {
  //     document.body.classList.add('has-fuyao-mask-loading');
  //   } else {
  //     document.body.classList.remove('has-fuyao-mask-loading');
  //   }
  //
  //   return () => {
  //     document.body.classList.remove('has-fuyao-mask-loading');
  //   };
  // }, [loading]);

  if (!loading) return null;

  return (
    <div
      className={classNames('fuyao-mask-loading', maskClassName)}
      style={maskStyle}
    >
      <div
        className={classNames('fuyao-mask-loading-content', loadingClassName)}
        style={loadingStyle}
      >
        {loadingContent ?? (
          <Spin tip={loadingText} indicator={loadingIcon as any} />
        )}
      </div>
    </div>
  );
};

export default FuyaoMaskLoading;
