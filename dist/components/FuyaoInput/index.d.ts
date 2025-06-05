import { Input, InputProps, InputRef } from 'antd';
import React from 'react';
export interface FuyaoInputProps extends InputProps {
    /**
     * 显示字数统计
     */
    showCount?: boolean | {
        formatter: (args: {
            count: number;
            maxLength?: number;
        }) => React.ReactNode;
    };
}
interface CompoundedComponent extends React.ForwardRefExoticComponent<FuyaoInputProps & React.RefAttributes<InputRef>> {
    TextArea: typeof Input.TextArea;
    Search: typeof Input.Search;
    Password: typeof Input.Password;
}
declare const FuyaoInputWithStatic: CompoundedComponent;
export default FuyaoInputWithStatic;
