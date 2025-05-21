import { FormInstance } from 'antd/es/form';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface useEditableState<
  recordType extends { editable_id: number; _key_id: number } = any,
  R = Partial<recordType>,
> {
  (val: { defaultData: R }): {
    state: R[];
    handleAdd: (v: R) => void;
  };
}

export class ServModalInstance {
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

export class ServTreeInstance {
  instance: any = null;

  setInstance(ins: { edit: (nodeKey: string | number) => void }) {
    this.instance = ins;
  }

  edit(nodeKey: string | number) {
    this.instance?.edit(nodeKey);
  }
}

export class ServFilterInstance {
  filterInstance: any = null;
  buttonInstance: any = null;

  setFilterInstance = (ins: { toggle: () => void }) => {
    this.filterInstance = ins;
  };

  setButtonInstance = (ins: { filter: (filtered: boolean) => void }) => {
    this.buttonInstance = ins;
  };

  toggle = () => {
    this?.filterInstance?.toggle();
  };

  filter = (filtered: boolean) => {
    this.buttonInstance?.filter(filtered);
  };
}

export function useModal(): ServModalInstance {
  const ref = useRef<ServModalInstance>(new ServModalInstance());
  return ref.current;
}

export const useServTree = () =>
  useRef<ServTreeInstance>(new ServTreeInstance()).current;

export const useServFilter = () => {
  const ref = useRef(new ServFilterInstance());
  return ref.current;
};

export const useValidateObservers = (customValidate: (res: any[]) => any) => {
  const validatesRef = useRef<FormInstance['validateFields'][]>([]);

  const addValidateFun = useCallback((fun: FormInstance['validateFields']) => {
    if (validatesRef.current.findIndex((f) => f === fun) === -1) {
      validatesRef.current.push(fun);
    }
  }, []);
  const removeValidateFun = useCallback(
    (fun: FormInstance['validateFields']) => {
      const index = validatesRef.current.findIndex((f) => f === fun);
      if (index >= 0) {
        validatesRef.current.splice(index, 1);
      }
    },
    []
  );

  const notifyObservers = useCallback(async () => {
    const results = await Promise.all(
      validatesRef.current.map(async (fun) => {
        const res = fun()
          .then((data) => data)
          .catch((err) => err);
        return res;
      })
    );
    const errors = results.filter((item) => item.errorFields?.length);
    const values = results.filter(
      (item) => !item.errorFields?.length && Object.keys(item || {})?.length
    );

    if (errors?.length) {
      return Promise.reject(errors.flat());
    }
    if (customValidate) {
      const res = await customValidate(values);
      if (res === false) {
        return Promise.reject('自定义校验不通过');
      }
    }
    return Promise.resolve(values);
  }, []);

  return {
    addValidateFun,
    removeValidateFun,
    notifyObservers,
  };
};
