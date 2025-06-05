import React from 'react';
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
/**
 * 富耀区块标题组件
 */
declare const FuyaoBlockTitle: React.FC<FuyaoBlockTitleProps>;
export default FuyaoBlockTitle;
