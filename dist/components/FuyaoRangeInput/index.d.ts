import { InputNumberProps } from 'antd/es/input-number';
export type FuyaoRangeInputProps = {
    /**
     * 允许起止位置为空
     */
    allowEmpty?: [boolean, boolean];
    /**
     * 分隔字符
     */
    separator?: string;
    /**
     * 输入框及分隔符之间的间隔
     */
    margin?: number;
    /**
     * 值
     */
    value?: [number | undefined, number | undefined];
    /**
     * 默认值
     */
    defaultValue?: [number | undefined, number | undefined];
    /**
     * 回调函数
     * @param value
     */
    onChange?: (value?: [number | undefined, number | undefined]) => void;
    /**
     * placeholder
     */
    placeholder?: string | [string, string];
} & Omit<InputNumberProps, 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'placeholder'>;
declare const FuyaoRangeInput: (props: FuyaoRangeInputProps) => import("react/jsx-runtime").JSX.Element;
export default FuyaoRangeInput;
