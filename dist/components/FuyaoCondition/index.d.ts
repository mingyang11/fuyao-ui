import React, { ReactNode } from 'react';
import './index.less';
interface RuleProps {
    key: string;
    [key: string]: any;
}
interface ConditionProps {
    key: string;
    relation: string;
    hidden?: boolean;
    rules: RuleProps[];
    [key: string]: any;
}
interface ValueProps {
    relation: string;
    conditions: ConditionProps[];
}
interface FuyaoConditionProps {
    className?: string;
    style?: React.CSSProperties;
    /**
     * 值
     */
    value?: ValueProps;
    /**
     * 回调
     * @param data
     */
    onChange?: (data: ValueProps | undefined) => void;
    /**
     * 可选关系
     */
    relations?: {
        label: string;
        value: string;
    }[];
    /**
     * 逻辑关系配置
     */
    relation?: {
        /**
         * 默认条件关系
         */
        defaultConditionRelation?: string;
        /**
         * 条件关系可编辑
         */
        conditionRelationEditable?: boolean;
        /**
         * 默认规则关系
         */
        defaultRuleRelation?: string;
        /**
         * 规则关系可编辑
         */
        ruleRelationEditable?: boolean;
    };
    /**
     * 自定义条件标题
     * @param item
     * @param index
     * @param changeItem
     */
    renderItemHeader?: (item: ConditionProps, index: number, changeItem: (key: string, value: any) => void) => ReactNode;
    /**
     * 自定义条件规则内容
     * @param rule
     * @param index
     * @param changeRule
     */
    renderRuleContent: (rule: RuleProps, index: number, changeRule: (key: string | Record<string | number, any>, value?: any) => void) => ReactNode;
    /**
     * 条件必填字段
     */
    requiredItemKeys?: string[];
    /**
     * 条件规则必填字段
     */
    requiredRuleKeys: string[];
    /**
     * 不可编辑状态
     */
    disabled?: boolean;
}
/**
 * 条件组合组件
 */
declare const FuyaoCondition: {
    (props: FuyaoConditionProps): import("react/jsx-runtime").JSX.Element;
    defaultProps: {
        relations: {
            label: string;
            value: string;
        }[];
        requiredItemKeys: never[];
    };
};
export default FuyaoCondition;
