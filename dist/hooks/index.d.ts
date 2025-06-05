export interface useEditableState<recordType extends {
    editable_id: number;
    _key_id: number;
} = any, R = Partial<recordType>> {
    (val: {
        defaultData: R;
    }): {
        state: R[];
        handleAdd: (v: R) => void;
    };
}
/**
 * 弹框实例
 */
export declare class FuyaoModalInstance {
    instance: any;
    opened: any;
    setInstance: (ins: {
        open: (arg?: any) => void;
        close: () => void;
        trigger: (type: "ok" | "cancel") => void;
    }) => void;
    open: (arg?: any) => void;
    close: () => void;
    trigger: (type: "ok" | "cancel") => void;
}
/**
 * 获取弹框实例hooks
 * @returns FuyaoModalInstance
 */
export declare function useFuyaoModal(): FuyaoModalInstance;
