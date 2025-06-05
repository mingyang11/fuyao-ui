import React from 'react';
export interface FuyaoFormInputProps {
    /**
     * 组件值
     */
    value?: any;
    /**
     * 默认值
     */
    defaultValue?: any;
    /**
     * 值变化回调
     */
    onChange?: (value: any, ...args: any[]) => void;
}
/**
 * 表单输入 Hook，用于管理表单控件的值状态
 * @param props 组件属性
 * @returns 状态和更新方法
 */
export declare const useFormInput: (props: FuyaoFormInputProps) => {
    value: any;
    cacheValue: (value: any, ...args: any[]) => void;
    updateValue: (value: any, ...args: any[]) => void;
    handleFocus: () => void;
    handleBlur: () => void;
    focusRef: React.RefObject<boolean>;
};
/**
 * 表单输入基础组件（函数式）
 *
 * 这是一个高阶组件，用于处理表单控件的值状态管理。
 * @param props 组件属性
 */
declare const FuyaoFormInput: React.FC<FuyaoFormInputProps>;
export default FuyaoFormInput;
