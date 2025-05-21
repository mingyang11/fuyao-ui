/**
 * 工具函数集合
 */
import * as typesExports from './types';
import * as hooksExports from './hooks';

export * from './types';
export * from './hooks';

/**
 * 类名工具函数，用于合并多个className
 * @param args 多个className参数
 * @returns 合并后的className字符串
 */
export const classnames = (...args: any[]): string => {
  return args
    .filter(Boolean)
    .map((item) => {
      if (typeof item === 'string') return item;
      if (Array.isArray(item)) return classnames(...item);
      if (typeof item === 'object') {
        return Object.keys(item)
          .filter((key) => item[key])
          .join(' ');
      }
      return '';
    })
    .join(' ');
};

/**
 * 类型判断工具
 */
export const types = {
  isPlainObject: (obj: any): boolean => {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },
  isFunction: (fn: any): boolean => {
    return typeof fn === 'function';
  },
  isString: (str: any): boolean => {
    return typeof str === 'string';
  },
  isArray: Array.isArray,
};
