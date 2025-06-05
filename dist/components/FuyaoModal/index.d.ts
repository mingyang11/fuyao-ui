import type { ModalProps } from 'antd/es/modal';
import React from 'react';
import { FuyaoModalInstance } from '../../hooks';
import './index.less';
export interface FuyaoModalProps extends Omit<ModalProps, 'visible' | 'onCancel' | 'onClose'> {
    /**
     * 弹窗绑定实例
     */
    modal: FuyaoModalInstance;
    /**
     * 打开窗口后的回调
     * @param arg 打开参数
     */
    onOpen?: (arg?: any) => void;
    /**
     * 关闭窗口后的回调
     * @param type 关闭类型
     */
    onClose?: (type?: 'cancel' | 'ok') => void;
    /**
     * 确认前的校验，如果 "return false" 则不执行确认回调，如果有其他返回值，则作为确认回调的参数传递，支持异步
     */
    beforeOk?: () => any;
    /**
     * 确认按钮回调
     * @param arg 确认参数
     */
    onOk?: (arg?: any) => void;
    /**
     * 取消按钮回调
     */
    onCancel?: () => void;
    /**
     * 隐藏底部按钮
     */
    hideFooter?: boolean;
    /**
     * 默认是否弹出（方便开发调试）
     */
    defaultVisible?: boolean;
    /**
     * 是否显示 确定按钮 loading 状态
     */
    showConfirmLoading?: boolean;
}
declare const FuyaoModal: React.FC<FuyaoModalProps>;
export default FuyaoModal;
