import { Form } from 'antd';
import type { FormItemProps, FormProps, FormInstance as AntdFormInstance } from 'antd/es/form';
import { AutoCompleteProps } from 'antd/es/auto-complete';
import { CascaderProps } from 'antd/es/cascader';
import { CheckboxProps } from 'antd/es/checkbox';
import { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { InputProps } from 'antd/es/input';
import { InputNumberProps } from 'antd/es/input-number';
import { MentionProps } from 'antd/es/mentions';
import { RadioGroupProps, RadioProps } from 'antd/es/radio';
import { RateProps } from 'antd/es/rate';
import { SelectProps } from 'antd/es/select';
import { SliderBaseProps, SliderRangeProps } from 'antd/es/slider';
import { SwitchProps } from 'antd/es/switch';
import { TimePickerProps, TimeRangePickerProps } from 'antd/es/time-picker';
import { TransferProps } from 'antd/es/transfer';
import { TreeSelectProps } from 'antd/es/tree-select';
import { UploadProps } from 'antd/es/upload';
import React from 'react';
import type { ObjectType } from '../../utils/types';
export type FuyaoFormInstance = AntdFormInstance;
export type NamePath = string | number | (string | number)[];
/**
 * 表单输入控件属性
 */
export type FormInputProps = (InputProps | InputNumberProps | AutoCompleteProps | CascaderProps | CheckboxProps | DatePickerProps | RangePickerProps | MentionProps | RadioProps | RadioGroupProps | RateProps | SelectProps | SliderBaseProps | SliderRangeProps | SwitchProps | TimePickerProps | TimeRangePickerProps | TransferProps<any> | TreeSelectProps<any> | UploadProps) & {
    [prop: string]: any;
};
/**
 * 富耀表单项属性
 */
export interface FuyaoFormItemProps extends Omit<FormItemProps, 'children'> {
    /**
     * 字段名
     */
    name?: NamePath;
    /**
     * 表单项类型
     */
    type?: 'input' | 'textarea' | 'password' | 'inputNumber' | 'autoComplete' | 'cascader' | 'checkbox' | 'checkboxGroup' | 'datePicker' | 'dateRangePicker' | 'select' | 'radio' | 'radioGroup' | 'rate' | 'slider' | 'switch' | 'timePicker' | 'timeRangePicker' | 'transfer' | 'treeSelect' | 'upload' | 'mentions';
    /**
     * 自定义输入组件
     */
    Input?: React.ComponentType<any>;
    /**
     * 自定义渲染函数
     */
    renderInput?: (formData: ObjectType, inputProps: FormInputProps) => React.ReactNode;
    /**
     * 是否范围输入
     */
    range?: boolean;
    /**
     * 表单项选项
     */
    options?: {
        label: string;
        value: any;
        [key: string]: any;
    }[];
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 占位符
     */
    placeholder?: string | string[];
    /**
     * 输入框宽度
     */
    inputWidth?: string | number;
    /**
     * 输入框属性
     */
    inputProps?: FormInputProps;
    /**
     * 子表单项
     */
    children?: FuyaoFormItemProps[];
    /**
     * 依赖的字段，当依赖字段值变化时触发更新
     */
    dependencies?: NamePath[];
    /**
     * 条件判断，返回 false 时不显示
     */
    condition?: (formData: ObjectType) => boolean;
    /**
     * 额外的校验规则
     */
    extraRules?: any[];
    [key: string]: any;
}
/**
 * 富耀表单属性
 */
export interface FuyaoFormProps extends Omit<FormProps, 'fields'> {
    /**
     * 表单字段定义
     */
    fields?: FuyaoFormItemProps[];
    /**
     * 表单值
     */
    value?: ObjectType;
    /**
     * 表单值变化回调
     */
    onChange?: (values: ObjectType) => void;
    /**
     * 表单禁用状态
     */
    disabled?: boolean;
    /**
     * 表单实例
     */
    form?: FuyaoFormInstance;
    /**
     * 条件选项
     */
    conditions?: Record<string, any[]>;
    /**
     * 表单布局
     */
    layout?: 'horizontal' | 'vertical' | 'inline';
    /**
     * 标签布局
     */
    labelCol?: FormProps['labelCol'];
    /**
     * 控件布局
     */
    wrapperCol?: FormProps['wrapperCol'];
    /**
     * 子元素（自定义渲染）
     */
    children?: React.ReactNode;
}
/**
 * 工具函数：根据名称路径获取对象属性
 */
export declare const getProperty: (obj: any, path: NamePath) => any;
/**
 * 工具函数：根据名称路径设置对象属性
 */
export declare const setProperty: (obj: any, path: NamePath, value: any) => any;
/**
 * 工具函数：判断对象是否包含指定路径的属性
 */
export declare const containsProperty: (obj: any, path: NamePath) => boolean;
/**
 * 工具函数：合并名称路径
 */
export declare const mergeName: (name1: NamePath, name2: NamePath) => NamePath;
/**
 * 工具函数：获取依赖字段名
 */
export declare const getDependencies: (fields: FuyaoFormItemProps[], parentName?: NamePath) => NamePath[];
/**
 * 表单输入控件渲染函数
 */
export declare const inputRender: (formItem: FuyaoFormItemProps, formData: ObjectType, conditions: any[], inputProps: FormInputProps, formDisabled?: boolean) => string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null | undefined;
/**
 * 富耀表单组件
 */
export declare const FuyaoForm: React.FC<FuyaoFormProps> & {
    Item: typeof Form.Item;
    List: typeof Form.List;
    useForm: typeof Form.useForm;
};
