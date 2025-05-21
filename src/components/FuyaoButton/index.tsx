import { Button, Popconfirm } from 'antd';
import type { ButtonProps, ButtonType } from 'antd/es/button';
import type { PopconfirmProps } from 'antd/es/popconfirm';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classnames, types } from '../../utils';
import { PermissionContext } from '../PermissionProvider';
import FuyaoMaskLoading from '../FuyaoMaskLoading';
import type { FuyaoMaskLoadingProps } from '../FuyaoMaskLoading';
import './index.less';

// 自定义按钮类型，包括antd原有类型和扩展类型
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
const FuyaoButton: React.FC<FuyaoButtonProps> = ({
  className,
  throttle = true,
  children,
  onClick,
  disabled,
  permissionCode,
  confirm,
  type = 'default',
  loading,
  maskLoading,
  ...others
}) => {
  // 是否拥有权限
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  // 权限 Context
  const {
    permissions,
    buttons,
    title = '暂无操作权限',
  } = useContext(PermissionContext);

  useEffect(() => {
    if (!permissionCode) {
      setHasPermission(true);
    } else {
      setHasPermission(!!permissions?.includes(permissionCode));
    }
  }, [permissions, permissionCode]);

  // 处理连击
  const ref = useRef<number>(-1000);
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (!hasPermission || disabled) return;
      if (throttle) {
        const now = Date.now();
        if (now - ref.current >= (throttle === true ? 500 : Number(throttle))) {
          ref.current = now;
        } else {
          return;
        }
      }
      onClick?.(e);
    },
    [throttle, onClick, hasPermission, disabled]
  );

  const text = !!permissionCode && buttons?.[permissionCode];

  const permissionTitle = !hasPermission && { title };

  const clickAble = !(!hasPermission || disabled);

  // 根据类型转换为antd支持的按钮类型
  const transformType = (btnType: FuyaoButtonType): ButtonType => {
    if (['a', 'oa'].includes(btnType as string)) {
      return 'link';
    }
    return btnType as ButtonType;
  };

  const renderButton = (handle = true) => (
    <Button
      className={classnames(
        'fuyao-button',
        ['a', 'oa'].includes(type as string) && 'fuyao-button-link',
        type === 'oa' && 'fuyao-button-color-orange',
        className
      )}
      disabled={!clickAble}
      type={transformType(type)}
      loading={!maskLoading && loading}
      size={['a', 'oa'].includes(type as string) ? 'small' : undefined}
      onClick={handle ? (e) => handleClick(e) : undefined}
      {...others}
      {...permissionTitle}
    >
      {children ?? text}
    </Button>
  );

  const renderConfirmButton = () => {
    const confirmObj = types.isPlainObject(confirm)
      ? (confirm as PopconfirmProps)
      : {
          title: confirm as string,
        };
    const { title: confirmTitle, onConfirm, ...confirmProps } = confirmObj;
    return (
      <Popconfirm
        title={confirmTitle}
        onConfirm={(e) => e && handleClick(e)}
        icon={null}
        {...confirmProps}
      >
        {renderButton(false)}
      </Popconfirm>
    );
  };

  if (clickAble && confirm) {
    return (
      <>
        {renderConfirmButton()}
        {maskLoading && (
          <FuyaoMaskLoading
            {...(typeof maskLoading === 'object' ? maskLoading : {})}
            loading={!!loading}
          />
        )}
      </>
    );
  }

  return (
    <>
      {renderButton()}
      {maskLoading && (
        <FuyaoMaskLoading
          {...(typeof maskLoading === 'object' ? maskLoading : {})}
          loading={!!loading}
        />
      )}
    </>
  );
};

export default FuyaoButton;
