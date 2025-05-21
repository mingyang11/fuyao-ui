import { ButtonProps, LegacyButtonType } from 'antd/es/button/button';
import { DirectionType } from 'antd/es/config-provider';
import React from 'react';

/**
 * React节点
 */
export type ReactNode = React.ReactNode;

/**
 * 函数返回数据或者直接数据
 */
export type FuncOrResult<T, R> = ((arg: T) => R) | R;

/**
 * 函数(需要返回React节点)或者React节点
 */
export type FuncOrReactNode<T> = ((arg: T) => ReactNode) | ReactNode;

/**
 * 同步数据或者Promise
 */
export type DataOrPromise<T> = Promise<T> | T;

/**
 * 通用对象类型
 */
export type ObjectType = Record<string, any>;

/**
 * 通用函数类型
 */
export type FunctionType = (...args: any[]) => any;

/**
 * 通用组件属性类型
 */
export type CommonProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * 列表请求参数
 */
export type QueryObject = {
  pageIndex: number;
  pageSize: number;
  sortOrder?: 'asc' | 'desc';
  sortField?: string;
  sorters: {
    order: 'asc' | 'desc';
    field: string;
  }[];
} & ObjectType;

/**
 * 列表请求结果
 */
export type ResultObject = {
  data?: any[];
  success?: boolean;
  message?: string;
  total?: number;
} & ObjectType;

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface ModalFuncProps {
  prefixCls?: string;
  className?: string;
  visible?: boolean;
  title?: React.ReactNode;
  closable?: boolean;
  content?: React.ReactNode;
  onOk?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  centered?: boolean;
  width?: string | number;
  okText?: React.ReactNode;
  okType?: LegacyButtonType;
  cancelText?: React.ReactNode;
  icon?: React.ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  zIndex?: number;
  okCancel?: boolean;
  style?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  type?: string;
  keyboard?: boolean;
  getContainer?: string | HTMLElement | (() => HTMLElement) | false | null;
  autoFocusButton?: null | 'ok' | 'cancel';
  transitionName?: string;
  maskTransitionName?: string;
  direction?: DirectionType;
  bodyStyle?: React.CSSProperties;
  closeIcon?: React.ReactNode;
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  focusTriggerAfterClose?: boolean;
}

export const tuple = <T extends string[]>(...args: T) => args;

export const tupleNum = <T extends number[]>(...args: T) => args;

export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type AllowEmpty<T> = T | null | undefined;
