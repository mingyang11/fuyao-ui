import type { ButtonProps, ButtonType } from 'antd/es/button';
import type { PopconfirmProps } from 'antd/es/popconfirm';
import React from 'react';
import type { FuyaoMaskLoadingProps } from '../FuyaoMaskLoading';
import './index.less';
type FuyaoButtonType = ButtonType | 'a' | 'oa';
interface FuyaoButtonProps extends Omit<ButtonProps, 'type'> {
    /**
     * 是否节流防止连击，默认 500 ms
     */
    throttle?: boolean | number;
    /**
     * 权限代码
     */
    permissionCode?: string;
    /**
     * 需要二次确认的按钮
     */
    confirm?: string | PopconfirmProps;
    /**
     * 按钮类型，a 类型本质还是 link，只不过左右 padding 为 6px； oa 橘色的文字链接
     */
    type?: FuyaoButtonType;
    /**
     * 使用全局遮罩
     */
    maskLoading?: boolean | FuyaoMaskLoadingProps;
}
/**
 * 富耀按钮组件
 */
declare const FuyaoButton: React.FC<FuyaoButtonProps>;
export default FuyaoButton;
