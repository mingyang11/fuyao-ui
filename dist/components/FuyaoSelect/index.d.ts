import type { SelectProps } from 'antd/es/select';
import './index.less';
export interface FuyaoSelectProps extends Omit<SelectProps, 'options'> {
    /**
     * 是否显示全选功能，当显示全选时，则 mode 默认为 'multiple'，全选时不支持搜索
     */
    showSelectAll?: boolean;
    /**
     * 全选描述
     */
    selectAllText?: string;
    /**
     * 是否显示 Checkbox，是则 mode 默认 'multiple' 模式
     */
    checkAble?: boolean;
    /**
     * 选项条件
     */
    options?: {
        value: any;
        label: string;
        disabled?: boolean;
    }[];
}
/**
 * 富耀选择器组件
 */
declare const FuyaoSelect: {
    (props: FuyaoSelectProps): import("react/jsx-runtime").JSX.Element;
    defaultProps: {
        showSelectAll: boolean;
        selectAllText: string;
        checkAble: boolean;
        options: never[];
    };
};
export default FuyaoSelect;
