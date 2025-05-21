import { useState, useCallback } from 'react';

/**
 * 对象状态管理 hook
 * @param initialState 初始状态
 * @returns [状态, 更新函数]
 */
export const useObjectState = <T extends object>(
  initialState: T = {} as T
): [T, (patch: Partial<T>) => void] => {
  const [state, setState] = useState<T>(initialState);

  const updateState = useCallback((patch: Partial<T>) => {
    setState((prevState) => ({ ...prevState, ...patch }));
  }, []);

  return [state, updateState];
};
