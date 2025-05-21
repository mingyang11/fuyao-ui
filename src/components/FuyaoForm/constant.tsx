import { Form } from 'antd';
import type {
  FormItemProps,
  FormProps,
  FormInstance as AntdFormInstance,
} from 'antd/es/form';
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
import classnames from 'classnames';
import React, { useState, useCallback, useMemo } from 'react';
import FuyaoInput from '../FuyaoInput';
import FuyaoSelect from '../FuyaoSelect';
import FuyaoRangeInput from '../FuyaoRangeInput';
import FuyaoRangePicker from '../FuyaoRangePicker';
import {
  Checkbox,
  Cascader,
  DatePicker,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  Mentions,
} from 'antd';
import type { ObjectType } from '../../utils/types';
import { useObjectState } from '../../utils/hooks';

export type FuyaoFormInstance = AntdFormInstance;

export type NamePath = string | number | (string | number)[];

/**
 * 表单输入控件属性
 */
export type FormInputProps = (
  | InputProps
  | InputNumberProps
  | AutoCompleteProps
  | CascaderProps
  | CheckboxProps
  | DatePickerProps
  | RangePickerProps
  | MentionProps
  | RadioProps
  | RadioGroupProps
  | RateProps
  | SelectProps
  | SliderBaseProps
  | SliderRangeProps
  | SwitchProps
  | TimePickerProps
  | TimeRangePickerProps
  | TransferProps<any>
  | TreeSelectProps<any>
  | UploadProps
) & {
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
  type?:
    | 'input'
    | 'textarea'
    | 'password'
    | 'inputNumber'
    | 'autoComplete'
    | 'cascader'
    | 'checkbox'
    | 'checkboxGroup'
    | 'datePicker'
    | 'dateRangePicker'
    | 'select'
    | 'radio'
    | 'radioGroup'
    | 'rate'
    | 'slider'
    | 'switch'
    | 'timePicker'
    | 'timeRangePicker'
    | 'transfer'
    | 'treeSelect'
    | 'upload'
    | 'mentions';
  /**
   * 自定义输入组件
   */
  Input?: React.ComponentType<any>;
  /**
   * 自定义渲染函数
   */
  renderInput?: (
    formData: ObjectType,
    inputProps: FormInputProps
  ) => React.ReactNode;
  /**
   * 是否范围输入
   */
  range?: boolean;
  /**
   * 表单项选项
   */
  options?: { label: string; value: any; [key: string]: any }[];
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
export const getProperty = (obj: any, path: NamePath): any => {
  if (!obj || !path) return undefined;
  const parts = Array.isArray(path) ? path : String(path).split('.');
  return parts.reduce(
    (o, key) => (o && typeof o === 'object' ? o[key] : undefined),
    obj
  );
};

/**
 * 工具函数：根据名称路径设置对象属性
 */
export const setProperty = (obj: any, path: NamePath, value: any): any => {
  if (!obj || !path) return obj;
  const parts = Array.isArray(path) ? path : String(path).split('.');
  const lastIndex = parts.length - 1;
  const lastPart = parts[lastIndex];

  parts.slice(0, lastIndex).reduce((o, key, index) => {
    if (o[key] === undefined)
      o[key] = isNaN(Number(parts[index + 1])) ? {} : [];
    return o[key];
  }, obj)[lastPart] = value;

  return obj;
};

/**
 * 工具函数：判断对象是否包含指定路径的属性
 */
export const containsProperty = (obj: any, path: NamePath): boolean => {
  return getProperty(obj, path) !== undefined;
};

/**
 * 工具函数：合并名称路径
 */
export const mergeName = (name1: NamePath, name2: NamePath): NamePath => {
  const name1Array = Array.isArray(name1) ? name1 : [name1];
  const name2Array = Array.isArray(name2) ? name2 : [name2];
  return [...name1Array, ...name2Array];
};

/**
 * 工具函数：获取依赖字段名
 */
export const getDependencies = (
  fields: FuyaoFormItemProps[],
  parentName?: NamePath
): NamePath[] => {
  return fields.reduce((deps: NamePath[], field) => {
    const { name, dependencies, children } = field;
    const fullName = name
      ? parentName
        ? mergeName(parentName, name)
        : name
      : parentName;

    if (dependencies) {
      deps.push(...dependencies);
    }

    if (children && fullName) {
      deps.push(...getDependencies(children, fullName));
    }

    return deps;
  }, []);
};

/**
 * 表单输入控件渲染函数
 */
export const inputRender = (
  formItem: FuyaoFormItemProps,
  formData: ObjectType,
  conditions: any[],
  inputProps: FormInputProps,
  formDisabled?: boolean
) => {
  const {
    type,
    Input: InputComponent,
    renderInput,
    range,
    options,
    disabled: itemDisabled,
    // 默认 placeholder
    placeholder = type === 'timeRangePicker'
      ? ['开始时间', '结束时间']
      : typeof formItem.label === 'string' &&
          !range &&
          type !== 'dateRangePicker'
        ? `${['cascader', 'select', 'treeSelect', 'datePicker', 'timePicker'].includes(type || '') ? '请选择' : '请输入'}${formItem.label}`
        : undefined,
    inputWidth,
  } = formItem;

  const {
    style,
    disabled: inputDisabled,
    className,
    ...others
  }: any = inputProps || {};
  const disabled = (inputDisabled ?? itemDisabled ?? formDisabled) || false;

  if (renderInput) {
    return renderInput(formData, inputProps);
  }

  const render = (InputComponent: any, props?: any) => {
    const { className: cn, style: st, Input, ...ops } = props || {};
    return (
      <InputComponent
        style={{
          width: ['switch', 'checkbox'].includes(type ?? '')
            ? undefined
            : inputWidth || '100%',
          ...st,
          ...style,
        }}
        className={classnames(cn, className)}
        disabled={disabled}
        placeholder={placeholder}
        {...ops}
        {...others}
      />
    );
  };

  const ops = options || conditions || [];
  const allowClear = true;

  if (InputComponent) {
    return render(InputComponent, { options: ops, allowClear });
  }

  switch (type) {
    case 'autoComplete':
      return render(FuyaoInput.Search, { options: ops, allowClear });
    case 'cascader':
      return render(Cascader, {
        options: ops,
        expandTrigger: 'hover',
        allowClear,
      });
    case 'checkbox':
      return render(Checkbox);
    case 'checkboxGroup':
      return render(Checkbox.Group, { options: ops });
    case 'datePicker':
      return render(range ? FuyaoRangePicker : DatePicker, { allowClear });
    case 'dateRangePicker':
      return render(DatePicker.RangePicker, { allowClear });
    case 'textarea':
      return render(FuyaoInput.TextArea, {
        style: { resize: 'none' },
        className: disabled && 'fuyao-textarea-disabled',
        allowClear,
      });
    case 'password':
      return render(FuyaoInput.Password, { allowClear: true });
    case 'inputNumber':
      return render(range ? FuyaoRangeInput : InputNumber);
    case 'mentions':
      return render(Mentions, {
        children: ops?.map((op) => (
          <Mentions.Option key={op.value} value={op.value}>
            {op.label}
          </Mentions.Option>
        )),
      });
    case 'radio':
      return render(Radio);
    case 'radioGroup':
      return render(Radio.Group, { options: ops });
    case 'rate':
      return render(Rate);
    case 'select':
      return render(FuyaoSelect, { options: ops, allowClear });
    case 'slider':
      return render(Slider);
    case 'switch':
      return render(Switch);
    case 'timePicker':
      return render(
        range ? FuyaoRangePicker : TimePicker,
        range ? { picker: 'time', allowClear } : { allowClear }
      );
    case 'timeRangePicker':
      return render(TimePicker.RangePicker, { allowClear });
    case 'transfer':
      return render(Transfer);
    case 'treeSelect':
      return render(TreeSelect, { treeData: ops, allowClear });
    case 'upload':
      return render(Upload);
    case 'input':
    default:
      return render(FuyaoInput, { autoComplete: 'off', allowClear });
  }
};

/**
 * 渲染表单项
 */
const renderFormItem = (
  field: FuyaoFormItemProps,
  formData: ObjectType,
  conditions: ObjectType,
  disabled?: boolean,
  parentName?: NamePath
) => {
  const { name, condition, inputProps, children, extraRules, ...itemProps } =
    field;

  // 处理条件渲染
  if (condition && !condition(formData)) {
    return null;
  }

  // 处理完整字段名
  const fullName = name
    ? parentName
      ? mergeName(parentName, name)
      : name
    : undefined;

  // 处理嵌套表单项
  if (children && children.length > 0 && fullName) {
    return (
      <Form.Item key={String(fullName)} name={fullName} {...itemProps}>
        {children.map((child) =>
          renderFormItem(child, formData, conditions, disabled, fullName)
        )}
      </Form.Item>
    );
  }

  // 处理普通表单项
  return (
    <Form.Item
      key={fullName ? String(fullName) : undefined}
      name={fullName}
      {...itemProps}
    >
      {inputRender(
        field,
        formData,
        conditions[name as string] || [],
        inputProps || {},
        disabled
      )}
    </Form.Item>
  );
};

/**
 * 富耀表单组件
 */
export const FuyaoForm = ((props: FuyaoFormProps) => {
  const {
    fields,
    value,
    onChange,
    disabled,
    form,
    conditions = {},
    layout = 'horizontal',
    labelCol,
    wrapperCol,
    children,
    ...formProps
  } = props;

  // 设置表单默认布局
  const defaultLabelCol = layout === 'horizontal' ? { span: 6 } : undefined;
  const defaultWrapperCol = layout === 'horizontal' ? { span: 18 } : undefined;

  // 使用 useMemo 缓存表单布局
  const formLayout = useMemo(
    () => ({
      labelCol: labelCol || defaultLabelCol,
      wrapperCol: wrapperCol || defaultWrapperCol,
    }),
    [labelCol, wrapperCol, layout]
  );

  return (
    <Form
      form={form}
      layout={layout}
      labelCol={formLayout.labelCol}
      wrapperCol={formLayout.wrapperCol}
      initialValues={value}
      onValuesChange={(_, values) => onChange?.(values)}
      {...formProps}
    >
      {fields?.map((field) =>
        renderFormItem(field, value || {}, conditions, disabled)
      )}
      {children}
    </Form>
  );
}) as unknown as React.FC<FuyaoFormProps> & {
  Item: typeof Form.Item;
  List: typeof Form.List;
  useForm: typeof Form.useForm;
};

// 静态属性赋值
FuyaoForm.Item = Form.Item;
FuyaoForm.List = Form.List;
FuyaoForm.useForm = Form.useForm;
