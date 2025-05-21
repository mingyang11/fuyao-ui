/**
 * 判断值是否为空
 * @param value 要检查的值
 * @returns 如果值为 null、undefined、空字符串、空数组或空对象则返回 true，否则返回 false
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }

  return false;
};
