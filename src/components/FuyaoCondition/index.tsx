import { Button, Divider, Select } from 'antd';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { classnames, types } from '../../utils';
// import FuyaoIcon from '../FuyaoIcon';
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
  relations?: { label: string; value: string }[];
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
  renderItemHeader?: (
    item: ConditionProps,
    index: number,
    changeItem: (key: string, value: any) => void
  ) => ReactNode;
  /**
   * 自定义条件规则内容
   * @param rule
   * @param index
   * @param changeRule
   */
  renderRuleContent: (
    rule: RuleProps,
    index: number,
    changeRule: (
      key: string | Record<string | number, any>,
      value?: any
    ) => void
  ) => ReactNode;
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

const RelationSwitch = (props: {
  value?: string;
  onChange: (val: string) => void;
  options: any[];
  disabled: boolean;
}) => {
  const { value, onChange, options, disabled } = props;

  return disabled ? (
    <span className={classnames('switch', 'disabled')}>
      {options?.find(({ value: val }) => val === value)?.label}
    </span>
  ) : (
    <Select
      className={'switch'}
      size={'middle'}
      dropdownClassName={'fuyao-condition-switch-dropdown'}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

/**
 * 条件组合组件
 */
const FuyaoCondition = (props: FuyaoConditionProps) => {
  const {
    renderItemHeader,
    renderRuleContent,
    className,
    style,
    value,
    onChange,
    relations = [],
    disabled = false,
    requiredItemKeys = [],
    requiredRuleKeys = [],
    relation: rel,
  } = props;

  const relOps = useMemo(
    () => ({
      defaultConditionRelation: relations?.[0]?.value || 'AND',
      conditionRelationEditable: true,
      defaultRuleRelation: relations?.[0]?.value || 'AND',
      ruleRelationEditable: true,
      ...rel,
    }),
    [rel, relations]
  );

  // 条件规则
  const genItemRule = useCallback(
    () => ({
      key: `rule-${Math.random().toString(36).substr(2)}`,
    }),
    []
  );

  // 条件
  const genItem = useCallback(
    (): ConditionProps => ({
      key: `item-${Math.random().toString(36).substr(2)}`,
      rules: [genItemRule()],
      relation: relOps.defaultRuleRelation,
      hidden: false,
    }),
    [relOps.defaultRuleRelation]
  );

  const [relation, setRelation] = useState<string>(
    value?.relation || relOps.defaultConditionRelation
  );

  const [items, setItems] = useState<ConditionProps[]>(
    value?.conditions?.length
      ? value.conditions.map((con) => ({
          ...genItem(),
          ...con,
          rules: con.rules?.map((rule) => ({ ...genItemRule(), ...rule })) || [
            genItemRule(),
          ],
        }))
      : [genItem()]
  );

  const mounted = useRef<boolean>(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (
      types.isPlainObject(items) ||
      items.some((item) =>
        requiredItemKeys.some((key) => types.isPlainObject(item[key]))
      ) ||
      items.some(({ rules }) =>
        rules.some((rule) =>
          requiredRuleKeys.some((key) => types.isPlainObject(rule[key]))
        )
      )
    ) {
      onChange?.(undefined);
    } else {
      onChange?.({
        relation,
        conditions: items,
      });
    }
  }, [items, relation, onChange, requiredItemKeys, requiredRuleKeys]);

  const handleChangeItem = useCallback(
    (index: number, key: keyof ConditionProps, value: any) => {
      setItems((items) => {
        const newItems = [...items];
        const newItem = {
          ...newItems[index],
          [key]: typeof value === 'function' ? value(items) : value,
        };
        newItems.splice(index, 1, newItem);
        return newItems;
      });
    },
    []
  );

  const handleChangeRule = useCallback(
    (itemIndex: number, ruleIndex: number, key: string, value: any) => {
      handleChangeItem(itemIndex, 'rules', (items: ConditionProps[]) => {
        const newRules = [...items[itemIndex].rules];
        const newRule = { ...newRules[ruleIndex], [key]: value };
        newRules.splice(ruleIndex, 1, newRule);
        return newRules;
      });
    },
    [handleChangeItem]
  );

  const handleChangeRuleValues = useCallback(
    (itemIndex: number, ruleIndex: number, rule: Record<string, any>) => {
      handleChangeItem(itemIndex, 'rules', (items: ConditionProps[]) => {
        const newRules = [...items[itemIndex].rules];
        const newRule = { ...newRules[ruleIndex], ...rule };
        newRules.splice(ruleIndex, 1, newRule);
        return newRules;
      });
    },
    [handleChangeItem]
  );

  const renderItemRules = (item: ConditionProps, itemIndex: number) => {
    const rLen = item.rules.length;
    return item.rules.map((rule, index) => {
      return (
        <div
          key={rule.key}
          className={classnames(
            'item-wrapper',
            rLen > 1 && 'multi',
            index === 0 && 'first-item',
            index === rLen - 1 && 'last-item'
          )}
        >
          <div className={'rule-item'}>
            <div className={'rule-index'}>{index + 1}</div>
            <div
              className={classnames(
                'rule-content',
                disabled && 'max-width',
                requiredRuleKeys.some((key) =>
                  types.isPlainObject(rule[key])
                ) && 'empty'
              )}
            >
              {renderRuleContent?.(rule, index, (key, val) => {
                if (val === undefined && typeof key === 'object') {
                  handleChangeRuleValues(itemIndex, index, key);
                } else {
                  handleChangeRule(itemIndex, index, key as string, val);
                }
              })}
            </div>

            {!disabled && (
              <div className={'rule-operation'}>
                {rLen > 1 && (
                  <Button
                    type={'primary'}
                    size={'middle'}
                    onClick={() => {
                      const newRules = [...item.rules];
                      newRules.splice(index, 1);
                      handleChangeItem(itemIndex, 'rules', newRules);
                    }}
                    ghost
                  >
                    -
                  </Button>
                )}
                {index === rLen - 1 && (
                  <Button
                    type={'primary'}
                    size={'middle'}
                    onClick={() => {
                      handleChangeItem(itemIndex, 'rules', [
                        ...item.rules,
                        genItemRule(),
                      ]);
                    }}
                    ghost
                  >
                    +
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  const renderItems = () => {
    const iLen = items.length;
    return items.map((item, index) => {
      return (
        <div
          key={item.key}
          className={classnames(
            'item-wrapper',
            iLen > 1 && 'multi',
            index === 0 && 'first-item',
            index === iLen - 1 && 'last-item'
          )}
        >
          <div
            className={'condition-item'}
            style={item.hidden ? { paddingBottom: 0 } : {}}
          >
            <div style={{ height: 40, lineHeight: '40px' }}>
              {renderItemHeader
                ? renderItemHeader(item, index, (key, value) =>
                    handleChangeItem(index, key, value)
                  )
                : `条件${index + 1}`}
            </div>
            {!disabled && (
              <div
                className={'close'}
                title={'删除'}
                onClick={() => {
                  const newItems = [...items];
                  newItems.splice(index, 1);
                  setItems(newItems);
                }}
              >
                {/* <FuyaoIcon type={'close'} /> */}
              </div>
            )}
            <Divider
              style={{
                margin: '0 0 20px',
                display: item.hidden ? 'none' : 'unset',
              }}
              dashed={false}
            />
            <div
              className={classnames(
                'rule-items',
                item.hidden && 'rule-items-hidden',
                item.rules?.length > 1 && 'has-switch'
              )}
            >
              {renderItemRules(item, index)}
              <RelationSwitch
                onChange={(val) => handleChangeItem(index, 'relation', val)}
                value={item.relation}
                options={relations}
                disabled={disabled || !relOps.ruleRelationEditable}
              />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className={classnames(
        'fuyao-condition',
        disabled && 'readonly',
        className
      )}
      style={style}
    >
      <div
        className={classnames(
          'condition-items',
          items.length > 1 && 'has-switch'
        )}
      >
        {renderItems()}
        <RelationSwitch
          onChange={(relation) => setRelation(relation)}
          value={relation}
          options={relations}
          disabled={disabled || !relOps.conditionRelationEditable}
        />
      </div>

      {!disabled && (
        <Button
          type={'link'}
          className={'add-condition'}
          onClick={() => setItems([...items, genItem()])}
        >
          <span className={'fc-plus'}>+</span>
          添加条件
        </Button>
      )}
    </div>
  );
};

FuyaoCondition.defaultProps = {
  relations: [
    { label: '且', value: 'AND' },
    { label: '或', value: 'OR' },
    { label: '非', value: 'NOT' },
  ],
  requiredItemKeys: [],
};

export default FuyaoCondition;
