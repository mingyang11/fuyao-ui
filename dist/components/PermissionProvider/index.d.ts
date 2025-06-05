import React from 'react';
import { ReactNode } from '../../utils/types';
type PermissionProviderProps = {
    /**
     * 按钮集合 { code: 'text', ... }
     */
    buttons?: Record<string, ReactNode>;
    /**
     * 拥有权限的按钮code
     */
    permissions?: string[];
    /**
     * 无权限时提醒的title
     */
    title?: string;
    children?: React.ReactNode;
};
export declare const PermissionContext: React.Context<PermissionProviderProps>;
declare const PermissionProvider: React.FC<PermissionProviderProps>;
export default PermissionProvider;
