import { Input, InputProps, InputRef } from 'antd';
import React from 'react';

export interface FuyaoInputProps extends InputProps {
  /**
   * 显示字数统计
   */
  showCount?:
    | boolean
    | {
        formatter: (args: {
          count: number;
          maxLength?: number;
        }) => React.ReactNode;
      };
}

/**
 * 富耀输入框组件
 */
const FuyaoInput = React.forwardRef<InputRef, FuyaoInputProps>((props, ref) => {
  return <Input ref={ref} {...props} />;
});

// 添加组件显示名称
FuyaoInput.displayName = 'FuyaoInput';

// 定义为命名空间对象类型，以支持静态属性
interface CompoundedComponent
  extends React.ForwardRefExoticComponent<
    FuyaoInputProps & React.RefAttributes<InputRef>
  > {
  TextArea: typeof Input.TextArea;
  Search: typeof Input.Search;
  Password: typeof Input.Password;
}

// 转换为有静态属性的组件
const FuyaoInputWithStatic = FuyaoInput as CompoundedComponent;

// 添加静态属性
FuyaoInputWithStatic.TextArea = Input.TextArea;
FuyaoInputWithStatic.Search = Input.Search;
FuyaoInputWithStatic.Password = Input.Password;

export default FuyaoInputWithStatic;
