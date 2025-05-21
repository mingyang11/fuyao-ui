import React, { useEffect } from 'react';
import { ObjectType, ReactNode } from '../../utils/types';
import { useObjectState } from '../../utils/hooks';

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

export const PermissionContext = React.createContext<PermissionProviderProps>(
  {}
);

const PermissionProvider: React.FC<PermissionProviderProps> = (props) => {
  const { children, ...others } = props;
  const [value, upValue] = useObjectState<ObjectType>(others);

  useEffect(() => {
    upValue(others);
  }, [others]);

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
