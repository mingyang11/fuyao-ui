import { Modal } from 'antd';
import type { ModalProps } from 'antd/es/modal';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { classnames } from '../../utils';
import './index.less';

/**
 * Modal实例接口
 * @example
 * ```tsx
 * const modal = useModal();
 *
 * // 打开弹窗
 * modal.setInstance({
 *   open: (arg) => {
 *     console.log('打开弹窗', arg);
 *   },
 *   close: (type) => {
 *     console.log('关闭弹窗', type);
 *   },
 *   trigger: (type) => {
 *     console.log('触发操作', type);
 *   },
 * });
 * ```
 */
export interface FuyaoModalInstance {
  /**
   * 弹窗是否打开
   */
  opened: boolean;
  /**
   * 设置弹窗实例
   */
  setInstance: (instance: {
    open: (arg?: any) => void;
    close: (type?: 'cancel' | 'ok') => void;
    trigger: (type: 'ok' | 'cancel') => void;
  }) => void;
}

export interface FuyaoModalProps
  extends Omit<ModalProps, 'visible' | 'onCancel' | 'onClose'> {
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

/**
 * 富耀弹窗组件
 * @example
 * ```tsx
 * const Demo = () => {
 *   const modal = useModal();
 *
 *   return (
 *     <>
 *       <Button onClick={() => modal.setInstance({ open: () => {} })}>
 *         打开弹窗
 *       </Button>
 *       <FuyaoModal
 *         modal={modal}
 *         title="标题"
 *         onOk={() => {
 *           console.log('确认');
 *         }}
 *       >
 *         内容
 *       </FuyaoModal>
 *     </>
 *   );
 * };
 * ```
 */
const FuyaoModal: React.FC<FuyaoModalProps> = ({
  modal,
  defaultVisible = false,
  children,
  onOpen,
  onClose,
  title,
  beforeOk,
  onOk,
  onCancel,
  hideFooter = false,
  className,
  showConfirmLoading,
  ...others
}) => {
  const [visible, setVisible] = useState<boolean>(defaultVisible);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const setModalOpened = useCallback(
    (opened: boolean) => {
      modal && (modal.opened = opened);
    },
    [modal]
  );

  /**
   * 打开回调
   */
  const handleOpen = useCallback(
    (arg?: any) => {
      setModalOpened(true);
      setVisible(true);
      setTimeout(() => onOpen?.(arg), 300);
    },
    [onOpen, setModalOpened]
  );

  /**
   * 关闭回调
   */
  const handleClose = useCallback(
    (type?: 'cancel' | 'ok') => {
      setModalOpened(false);
      setVisible(false);
      onClose?.(type);
    },
    [onClose, setModalOpened]
  );

  /**
   * 确认回调
   */
  const handleOk = useCallback(async () => {
    let res: any = true;
    setConfirmLoading(true);
    try {
      if (beforeOk) {
        res = await beforeOk();
        if (res === false) {
          return;
        }
      }
      if (onOk) {
        res = await onOk(res);
        if (res === false) {
          return;
        }
      }
      handleClose('ok');
    } finally {
      setConfirmLoading(false);
    }
  }, [beforeOk, onOk, handleClose]);

  /**
   * 取消回调
   */
  const handleCancel = useCallback(() => {
    onCancel?.();
    handleClose('cancel');
  }, [onCancel, handleClose]);

  /**
   * 触发确认/取消操作
   */
  const handleTrigger = useCallback(
    (type: 'ok' | 'cancel') => {
      if (type === 'ok') {
        handleOk();
      } else {
        handleCancel();
      }
    },
    [handleOk, handleCancel]
  );

  /**
   * 关联modal实例
   */
  useMemo(() => {
    setModalOpened(visible);
    modal?.setInstance({
      open: handleOpen,
      close: handleClose,
      trigger: handleTrigger,
    });
  }, [handleOpen, handleClose, handleTrigger, modal, setModalOpened, visible]);

  /**
   * 初始化
   */
  useEffect(() => {
    visible && handleOpen();
  }, []);

  const mergedClassName = classnames('fuyao-modal', className);

  const footerProp = {
    ...(hideFooter && { footer: null }),
  };

  return (
    <Modal
      title={title}
      className={mergedClassName}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      {...footerProp}
      destroyOnClose
      maskClosable={false}
      {...(showConfirmLoading && { confirmLoading })}
      {...others}
    >
      {children}
    </Modal>
  );
};

export default FuyaoModal;
