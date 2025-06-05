import { useRef } from 'react';

export interface useEditableState<
  recordType extends { editable_id: number; _key_id: number } = any,
  R = Partial<recordType>,
> {
  (val: { defaultData: R }): {
    state: R[];
    handleAdd: (v: R) => void;
  };
}

/**
 * 弹框实例
 */
export class FuyaoModalInstance {
  instance: any = null;

  opened: any = false;

  setInstance = (ins: {
    open: (arg?: any) => void;
    close: () => void;
    trigger: (type: 'ok' | 'cancel') => void;
  }) => {
    this.instance = ins;
  };

  open = (arg?: any) => {
    this.instance?.open(arg);
  };

  close = () => {
    this.instance?.close();
  };

  trigger = (type: 'ok' | 'cancel') => {
    this.instance?.trigger(type);
  };
}
/**
 * 获取弹框实例hooks
 * @returns FuyaoModalInstance
 */
export function useFuyaoModal(): FuyaoModalInstance {
  const ref = useRef(new FuyaoModalInstance());
  return ref.current;
}
