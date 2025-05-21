import React, { useState, useRef } from 'react';

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
export const useFormInput = (props: FuyaoFormInputProps) => {
  const { value: propsValue, defaultValue, onChange } = props;
  const [stateValue, setStateValue] = useState(defaultValue);
  const [tempValue, setTempValue] = useState<any>(undefined);

  // 获取当前值
  const getValue = () => {
    // 存在临时值时则返回临时值
    if (tempValue !== undefined) {
      return tempValue;
    }
    // props 传值了则取 props 的值
    if ('value' in props) {
      return propsValue;
    }
    // 否则取自身状态保存的值
    return stateValue;
  };

  /**
   * 缓存值，临时不合法的值，用于组件内部显示，并不能同步给父组件
   * @param value 要缓存的值
   * @param args 额外参数
   */
  const cacheValue = (value: any, ...args: any[]) => {
    setStateValue(undefined);
    setTempValue(value);
  };

  /**
   * 更新值，同步给父组件
   * @param value 要更新的值
   * @param args 额外参数
   */
  const updateValue = (value: any, ...args: any[]) => {
    onChange?.(value, ...args);

    // props 控制值，则不更新内部值
    if ('value' in props) {
      setStateValue(undefined);
      setTempValue(undefined);
      return;
    }

    // 更新内部值
    setStateValue(value);
    setTempValue(undefined);
  };

  // 焦点状态引用
  const focusRef = useRef(false);

  /**
   * 获得焦点
   */
  const handleFocus = () => {
    focusRef.current = true;
  };

  /**
   * 失去焦点
   */
  const handleBlur = () => {
    focusRef.current = false;
  };

  return {
    value: getValue(),
    cacheValue,
    updateValue,
    handleFocus,
    handleBlur,
    focusRef,
  };
};

/**
 * 表单输入基础组件（函数式）
 *
 * 这是一个高阶组件，用于处理表单控件的值状态管理。
 * @param props 组件属性
 */
const FuyaoFormInput: React.FC<FuyaoFormInputProps> = (props) => {
  const { value } = useFormInput(props);

  // 这是一个基础组件，通常不直接使用，而是被继承或包装
  return <>{value}</>;
};

export default FuyaoFormInput;
