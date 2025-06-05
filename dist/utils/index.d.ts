export * from './types';
export * from './hooks';
/**
 * 类名工具函数，用于合并多个className
 * @param args 多个className参数
 * @returns 合并后的className字符串
 */
export declare const classnames: (...args: any[]) => string;
/**
 * 类型判断工具
 */
export declare const types: {
    isPlainObject: (obj: any) => boolean;
    isFunction: (fn: any) => boolean;
    isString: (str: any) => boolean;
    isArray: (arg: any) => arg is any[];
};
