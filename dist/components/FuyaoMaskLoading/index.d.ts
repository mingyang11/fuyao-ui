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
declare const FuyaoMaskLoading: React.FC<FuyaoMaskLoadingProps>;
export default FuyaoMaskLoading;
