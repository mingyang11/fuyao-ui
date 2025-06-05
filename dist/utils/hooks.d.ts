/**
 * 对象状态管理 hook
 * @param initialState 初始状态
 * @returns [状态, 更新函数]
 */
export declare const useObjectState: <T extends object>(initialState?: T) => [T, (patch: Partial<T>) => void];
