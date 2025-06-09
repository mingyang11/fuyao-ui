/**
 * URL 工具函数集合
 */

/**
 * 解析URL查询参数
 * @param url URL字符串或location.search
 * @returns 查询参数对象
 */
export const parseQuery = (url?: string): Record<string, string> => {
  const search =
    url || (typeof window !== 'undefined' ? window.location.search : '');
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }

  return result;
};

/**
 * 将对象转换为查询字符串
 * @param params 参数对象
 * @returns 查询字符串
 */
export const stringifyQuery = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
};

/**
 * 拼接URL和查询参数
 * @param baseUrl 基础URL
 * @param params 查询参数
 * @returns 完整URL
 */
export const buildUrl = (
  baseUrl: string,
  params?: Record<string, any>
): string => {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl;
  }

  const queryString = stringifyQuery(params);
  const separator = baseUrl.includes('?') ? '&' : '?';

  return `${baseUrl}${separator}${queryString}`;
};

/**
 * 获取URL的域名部分
 * @param url URL字符串
 * @returns 域名
 */
export const getDomain = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
};

/**
 * 判断是否为有效的URL
 * @param url URL字符串
 * @returns 是否有效
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * 判断是否为外部链接
 * @param url URL字符串
 * @returns 是否为外部链接
 */
export const isExternalUrl = (url: string): boolean => {
  if (!isValidUrl(url)) {
    return false;
  }

  const currentDomain =
    typeof window !== 'undefined' ? window.location.hostname : '';
  const urlDomain = getDomain(url);

  return urlDomain !== currentDomain;
};
